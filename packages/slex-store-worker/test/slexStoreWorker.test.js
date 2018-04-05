import { expect } from 'chai'
import sinon from 'sinon'
import deepDiff from '../src/deepDiff'
import applyDiff from '../src/applyDiff'
import workerStub from './workerStub'
import slexStore from 'slex-store'
import slexStoreWorker from '../src/slexStoreWorker'

describe('slexStoreWorker', function () {
  const sandbox = sinon.sandbox.create()
  let restoreWorker
  before(function () {
    restoreWorker = workerStub()
  })
  after(function () {
    restoreWorker()
  })
  beforeEach(function () {
    sandbox.restore()
  })
  afterEach(function () {
    sandbox.restore()
  })
  describe('createSyncAction', function () {
    const state1 = {}
    const state1Changed = {}
    const state2 = {}
    const prevState = {
      state1,
      state2
    }
    const nextState = {
      state1: state1Changed,
      state2
    }
    let diffStub
    let action
    const payloadAction = {}
    const diffStubResult = []
    beforeEach(function () {
      diffStub = sandbox.stub(deepDiff, 'diff').returns(diffStubResult)
      action = slexStoreWorker.createSyncAction({ prevState, nextState, action: payloadAction })
    })
    it('should return an object', function () {
      expect(action).to.exist
      expect(typeof action === 'object').to.equal(true)
    })
    it('should have type SYNC_WITH_WORKER_STORE', function () {
      expect(action.type).to.exist
      expect(action.type).to.equal('SYNC_WITH_WORKER_STORE')
    })
    it('should have action', function () {
      expect(action.action).to.exist
      expect(action.action).to.equal(payloadAction)
    })
    it('should have differences from deep diff', function () {
      expect(action.differences).to.exist
      expect(action.differences).to.equal(diffStubResult)
    })
    it('should calculate deep diff only on the stores which have changed', function () {
      expect(action.differences).to.exist
      expect(diffStub.calledOnce).to.equal(true)
      const diffPrevPartialStateKeys = Object.keys(diffStub.firstCall.args[0])
      const diffNextPartialStateKeys = Object.keys(diffStub.firstCall.args[1])
      expect(diffPrevPartialStateKeys.length).to.equal(1)
      expect(diffNextPartialStateKeys.length).to.equal(1)
      expect(diffStub.firstCall.args[0][diffPrevPartialStateKeys[0]]).to.equal(state1)
      expect(diffStub.firstCall.args[1][diffNextPartialStateKeys[0]]).to.equal(state1Changed)
    })
  })
  describe('createClientReducer', function () {
    const state1 = {}
    const state2 = {}
    const prevState = {
      state1,
      state2
    }
    const nextState = {
      state1,
      state2
    }
    let diffStub
    let applyDiffStub
    let createReducerStub
    let baseReducerStub
    const baseReducerStubResult = {}
    const payloadAction = {}
    const diffStubResult = []
    const applyDiffStubResult = {}
    beforeEach(function () {
      baseReducerStub = sandbox.stub().returns(baseReducerStubResult)
      createReducerStub = sandbox.stub(slexStore, 'createReducer').returns(baseReducerStub)
      applyDiffStub = sandbox.stub(applyDiff, 'applyDifferences').returns(applyDiffStubResult)
      diffStub = sandbox.stub(deepDiff, 'diff').returns(diffStubResult)
    })
    it('should return a function', function () {
      const reducer = slexStoreWorker.createClientReducer()
      expect(reducer).to.exist
      expect(typeof reducer === 'function').to.equal(true)
    })
    it('should return a reducer which applies differences when the action is a sync action', function () {
      const action = slexStoreWorker.createSyncAction({ prevState, nextState, action: payloadAction })
      const reducer = slexStoreWorker.createClientReducer()
      const reduceResult = reducer(prevState, action)
      expect(reduceResult).to.equal(applyDiffStubResult)
    })
    it('should return a reducer which returns baseReducer result when the action is any action other than a sync action', function () {
      const action = {}
      const reducer = slexStoreWorker.createClientReducer()
      const reduceResult = reducer(prevState, action)
      expect(reduceResult).to.equal(baseReducerStubResult)
    })
  })
  describe('createClientDispatch', function () {
    const middleware = [{}]
    const sideEffects = []
    const action = {}
    const prevState = {}
    const nextState = {}
    let reducer
    let worker
    let diffStub
    let createDispatchStub
    let applyDispatchStub
    let createDispatchStubResult
    let diffStubResult = []
    let appliedDispatchStubResult = {
      stateChanged: true,
      nextState
    }
    let createForwardActionToWorkerStoreMiddlewareStub
    let createForwardActionToWorkerStoreMiddlewareStubResult = {}
    beforeEach(function () {
      diffStub = sandbox.stub(deepDiff, 'diff').returns(diffStubResult)
      createForwardActionToWorkerStoreMiddlewareStub = sandbox.stub(slexStoreWorker, 'createForwardActionToWorkerStoreMiddleware').returns(createForwardActionToWorkerStoreMiddlewareStubResult)
      applyDispatchStub = sandbox.stub().returns(appliedDispatchStubResult)
      createDispatchStubResult = {
        reducer: sandbox.spy(),
        applyDispatch: sandbox.stub().returns(applyDispatchStub)
      }
      createDispatchStub = sandbox.stub(slexStore, 'createDispatch').returns(createDispatchStubResult)
      reducer = sandbox.spy()
      worker = new Worker('testUrl')
    })

    it('should createDispatch with slex-store', function () {
      const result = slexStoreWorker.createClientDispatch({
        worker,
        reducer,
        middleware,
        sideEffects
      })
      expect(createDispatchStub.calledOnce).to.be.true
    })
    it('should createDispatch with given reducer', function () {
      const result = slexStoreWorker.createClientDispatch({
        worker,
        reducer,
        middleware,
        sideEffects
      })
      expect(createDispatchStub.firstCall.args[0].reducer).to.equal(reducer)
    })
    it('should createDispatch with given sideEffects', function () {
      const result = slexStoreWorker.createClientDispatch({
        worker,
        reducer,
        middleware,
        sideEffects
      })
      expect(createDispatchStub.firstCall.args[0].sideEffects).to.equal(sideEffects)
    })
    it('should createForwardActionToWorkerStoreMiddleware and prefix the middleware with the created forwardActionToWorkerStoreMiddleware', function () {
      const result = slexStoreWorker.createClientDispatch({
        worker,
        reducer,
        middleware,
        sideEffects
      })
      expect(createForwardActionToWorkerStoreMiddlewareStub.calledOnce).to.be.true
      expect(createDispatchStub.firstCall.args[0].middleware[0]).to.equal(createForwardActionToWorkerStoreMiddlewareStubResult)
      expect(createDispatchStub.firstCall.args[0].middleware[1]).to.equal(middleware[0])
    })
    it('should return an object with applyDispatch which wraps the slex store applyDispatch', function () {
      const result = slexStoreWorker.createClientDispatch({
        worker,
        reducer,
        middleware,
        sideEffects
      })
      const dispatch = sandbox.spy()
      const getState = sandbox.spy()
      const setState = sandbox.spy()
      const notifyListeners = sandbox.spy()
      const appliedDispatch = result.applyDispatch({ dispatch, getState, setState, notifyListeners })
      expect(appliedDispatch).to.equal(applyDispatchStub)
      expect(result.reducer).to.equal(createDispatchStubResult.reducer)
    })
    it('should set worker onmessage callback', function () {
      const result = slexStoreWorker.createClientDispatch({
        worker,
        reducer,
        middleware,
        sideEffects
      })
      const event = {
        data: slexStoreWorker.createSyncAction({ prevState, nextState, action })
      }
      const dispatch = sandbox.spy()
      const getState = sandbox.spy()
      const setState = sandbox.spy()
      const notifyListeners = sandbox.spy()
      const appliedDispatch = result.applyDispatch({ dispatch, getState, setState, notifyListeners })
      expect(worker.onmessage).to.exist
    })
    it('should dispatch sync action onmessage', function () {
      const result = slexStoreWorker.createClientDispatch({
        worker,
        reducer,
        middleware,
        sideEffects
      })
      const event = {
        data: slexStoreWorker.createSyncAction({ prevState, nextState, action })
      }
      const dispatch = sandbox.spy()
      const getState = sandbox.spy()
      const setState = sandbox.spy()
      const notifyListeners = sandbox.spy()
      const appliedDispatch = result.applyDispatch({ dispatch, getState, setState, notifyListeners })
      expect(worker.onmessage).to.exist
      worker.onmessage(event)
      expect(dispatch.calledOnce).to.be.true
      expect(dispatch.firstCall.args[0].type).to.equal('SYNC_WITH_WORKER_STORE')
      expect(dispatch.firstCall.args[0].differences).to.equal(diffStubResult)
      expect(dispatch.firstCall.args[0].action).to.equal(action)
    })
    it('should not dispatch anything onmessage when data is not sync action', function () {
      const result = slexStoreWorker.createClientDispatch({
        worker,
        reducer,
        middleware,
        sideEffects
      })
      const event = {
        data: {}
      }
      const dispatch = sandbox.spy()
      const getState = sandbox.spy()
      const setState = sandbox.spy()
      const notifyListeners = sandbox.spy()
      const appliedDispatch = result.applyDispatch({ dispatch, getState, setState, notifyListeners })
      expect(worker.onmessage).to.exist
      worker.onmessage(event)
      expect(dispatch.notCalled).to.be.true
    })
  })
  describe('createWorkerDispatch', function () {
    const middleware = []
    const sideEffects = []
    const prevState = {}
    const nextState = {}
    let reducer
    let workerGlobalContext
    let diffStub
    let createDispatchStub
    let applyDispatchStub
    let diffStubResult = []
    let createDispatchStubResult
    let appliedDispatchStubResult = {
      stateChanged: true,
      nextState
    }
    beforeEach(function () {
      diffStub = sandbox.stub(deepDiff, 'diff').returns(diffStubResult)
      applyDispatchStub = sandbox.stub().returns(appliedDispatchStubResult)
      createDispatchStubResult = {
        reducer: sandbox.spy(),
        applyDispatch: sandbox.stub().returns(applyDispatchStub)
      }
      createDispatchStub = sandbox.stub(slexStore, 'createDispatch').returns(createDispatchStubResult)
      reducer = sandbox.spy()
      workerGlobalContext = {
        addEventListener: sandbox.spy(),
        postMessage: sandbox.spy()
      }
    })
    it('should createDispatch with slex-store', function () {
      const result = slexStoreWorker.createWorkerDispatch({
        workerGlobalContext,
        reducer,
        middleware,
        sideEffects
      })
      expect(createDispatchStub.calledOnce).to.be.true
    })
    it('should createDispatch with given reducer', function () {
      const result = slexStoreWorker.createWorkerDispatch({
        workerGlobalContext,
        reducer,
        middleware,
        sideEffects
      })
      expect(createDispatchStub.firstCall.args[0].reducer).to.equal(reducer)
    })
    it('should createDispatch with given middleware', function () {
      const result = slexStoreWorker.createWorkerDispatch({
        workerGlobalContext,
        reducer,
        middleware,
        sideEffects
      })
      expect(createDispatchStub.firstCall.args[0].middleware).to.equal(middleware)
    })
    it('should createDispatch with given sideEffects', function () {
      const result = slexStoreWorker.createWorkerDispatch({
        workerGlobalContext,
        reducer,
        middleware,
        sideEffects
      })
      expect(createDispatchStub.firstCall.args[0].sideEffects).to.equal(sideEffects)
    })
    it('should return an object with the reducer returned by createDispatch', function () {
      const result = slexStoreWorker.createWorkerDispatch({
        workerGlobalContext,
        reducer,
        middleware,
        sideEffects
      })
      expect(result.reducer).to.equal(createDispatchStubResult.reducer)
    })
    it('should return an object with applyDispatch which wraps the slex store applyDispatch', function () {
      const result = slexStoreWorker.createWorkerDispatch({
        workerGlobalContext,
        reducer,
        middleware,
        sideEffects
      })
      const dispatch = sandbox.spy()
      const getState = sandbox.spy()
      const setState = sandbox.spy()
      const notifyListeners = sandbox.spy()
      const appliedDispatch = result.applyDispatch({ dispatch, getState, setState, notifyListeners })
      expect(createDispatchStubResult.applyDispatch.calledOnce).to.be.true
    })
    it('should return an object with applyDispatch which dispatches actions forwarded by client', function () {
      const result = slexStoreWorker.createWorkerDispatch({
        workerGlobalContext,
        reducer,
        middleware,
        sideEffects
      })
      const action = {}
      const event = {
        data: action
      }
      const dispatch = sandbox.spy()
      const getState = sandbox.spy()
      const setState = sandbox.spy()
      const notifyListeners = sandbox.spy()
      const appliedDispatch = result.applyDispatch({ dispatch, getState, setState, notifyListeners })

      expect(workerGlobalContext.addEventListener.calledOnce).to.be.true
      const workerForwardedActionEventHandler = workerGlobalContext.addEventListener.firstCall.args[1]
      workerForwardedActionEventHandler(event)
      expect(applyDispatchStub.calledOnce).to.be.true
      expect(applyDispatchStub.firstCall.args[0]).to.equal(action)
    })
    it('should return an object with applyDispatch which forwards slex-store appliedDispatch result', function () {
      const result = slexStoreWorker.createWorkerDispatch({
        workerGlobalContext,
        reducer,
        middleware,
        sideEffects
      })
      const action = {}
      const event = {
        data: action
      }
      const dispatch = sandbox.spy()
      const getState = sandbox.spy()
      const setState = sandbox.spy()
      const notifyListeners = sandbox.spy()
      const appliedDispatch = result.applyDispatch({ dispatch, getState, setState, notifyListeners })
      const appliedDispatchResult = appliedDispatch(action)
      expect(appliedDispatchResult).to.equal(appliedDispatchStubResult)
    })
    it('should return an object with applyDispatch which has a side effect of notifying client about nextState', function () {
      const result = slexStoreWorker.createWorkerDispatch({
        workerGlobalContext,
        reducer,
        middleware,
        sideEffects
      })
      const action = {}
      const event = {
        data: action
      }
      const dispatch = sandbox.spy()
      const getState = sandbox.spy()
      const setState = sandbox.spy()
      const notifyListeners = sandbox.spy()
      const appliedDispatch = result.applyDispatch({ dispatch, getState, setState, notifyListeners })
      appliedDispatch(action)
      expect(workerGlobalContext.postMessage.calledOnce).to.be.true
      expect(workerGlobalContext.postMessage.firstCall.args[0].type).to.equal('SYNC_WITH_WORKER_STORE')
      expect(workerGlobalContext.postMessage.firstCall.args[0].action).to.equal(action)
      expect(workerGlobalContext.postMessage.firstCall.args[0].differences).to.equal(diffStubResult)
    })
  })
  
  describe('createForwardActionToWorkerStoreMiddleware', function () {
    let worker
    let dispatchStub
    let getStateStub
    const action = { type: 'createForwardActionToWorkerStoreMiddlewareTest' }
    const syncAction = slexStoreWorker.createSyncAction({})
    beforeEach(function () {
      dispatchStub = sandbox.stub()
      getStateStub = sandbox.stub()
      worker = {
        postMessage: sandbox.spy()
      }
    })
    it('should return a function', function () {
      const middleware = slexStoreWorker.createForwardActionToWorkerStoreMiddleware({ worker })
      expect(middleware).to.exist
      expect(typeof middleware === 'function').to.equal(true)
    })
    it('should return a middleware which forwards actions to worker', function () {
      const middleware = slexStoreWorker.createForwardActionToWorkerStoreMiddleware({ worker })
      middleware(dispatchStub, getStateStub, action)
      expect(worker.postMessage.calledOnce).to.be.true
      expect(worker.postMessage.firstCall.args[0]).to.equal(action)
    })
    it('should return a middleware which ignores sync actions', function () {
      const middleware = slexStoreWorker.createForwardActionToWorkerStoreMiddleware({ worker })
      middleware(dispatchStub, getStateStub, syncAction)
      expect(worker.postMessage.called).to.be.false
    })
  })
})