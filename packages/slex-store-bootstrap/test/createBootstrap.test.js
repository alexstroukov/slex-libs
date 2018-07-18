import { expect } from 'chai'
import sinon from 'sinon'
import createBootstrap from '../src/createBootstrap'
import actions from '../src/bootstrap.actions'
import { defer } from './utils'

describe('createBootstrap', function () {
  const sandbox = sinon.sandbox.create()
  beforeEach(function () {
    sandbox.restore()
  })
  afterEach(function () {
    sandbox.restore()
  })
  // describe('when all bootstrappers succeed', function () {
  //   const bootstrapSuccessStubResult = {}
  //   let bootstrapSuccessStub
  //   let restoreLoginBootstrapDeferred
  //   let loadMetadataBootstrapDeferred
  //   let dispatchStub
  //   let getStateStub
  //   let restoreLoginBootstrapStub
  //   let loadMetadataBootstrapStub
  //   beforeEach(function () {
  //     bootstrapSuccessStub = sandbox.stub(actions, 'bootstrapSuccess').returns(bootstrapSuccessStubResult)
  //     restoreLoginBootstrapDeferred = defer()
  //     loadMetadataBootstrapDeferred = defer()
  //     dispatchStub = sandbox.stub()
  //     getStateStub = sandbox.stub()
  //     restoreLoginBootstrapStub = sandbox.stub().returns(restoreLoginBootstrapDeferred.promise)
  //     loadMetadataBootstrapStub = sandbox.stub().returns(loadMetadataBootstrapDeferred.promise)
  //   })
  //   it('should return a function which runs all bootstrappers when called and dispatches bootstrapSuccess action', function () {
  //     const bootstrap = createBootstrap({
  //       restoreLogin: restoreLoginBootstrapStub,
  //       loadMetadata: loadMetadataBootstrapStub
  //     })
  //     bootstrap({ dispatch: dispatchStub, getState: getStateStub })
  //     expect(restoreLoginBootstrapStub.calledOnce).to.equal(true)
  //     expect(restoreLoginBootstrapStub.firstCall.args[0].dispatch).to.equal(dispatchStub)
  //     expect(restoreLoginBootstrapStub.firstCall.args[0].getState).to.equal(getStateStub)
  //     expect(loadMetadataBootstrapStub.calledOnce).to.equal(true)
  //     expect(loadMetadataBootstrapStub.firstCall.args[0].dispatch).to.equal(dispatchStub)
  //     expect(loadMetadataBootstrapStub.firstCall.args[0].getState).to.equal(getStateStub)
  //     expect(dispatchStub.notCalled).to.equal(true)
  //     loadMetadataBootstrapDeferred.resolve()
  //     return loadMetadataBootstrapDeferred.promise
  //       .then(() => {
  //         expect(dispatchStub.notCalled).to.equal(true)
  //         restoreLoginBootstrapDeferred.resolve()
  //         return restoreLoginBootstrapDeferred.promise
  //           .then(() => {
  //             expect(dispatchStub.calledOnce).to.equal(true)
  //             expect(dispatchStub.firstCall.args[0]).to.equal(bootstrapSuccessStubResult)
  //           })
  //       })
  //   })
  // })
  describe('when some bootstrappers fail', function () {
    const bootstrapFailStubResult = {}
    let bootstrapFailStub
    let restoreLoginBootstrapDeferred
    let loadMetadataBootstrapDeferred
    let dispatchStub
    let getStateStub
    let restoreLoginBootstrapStub
    let loadMetadataBootstrapStub
    beforeEach(function () {
      bootstrapFailStub = sandbox.stub(actions, 'bootstrapFail').returns(bootstrapFailStubResult)
      restoreLoginBootstrapDeferred = defer()
      loadMetadataBootstrapDeferred = defer()
      dispatchStub = sandbox.stub()
      getStateStub = sandbox.stub()
      restoreLoginBootstrapStub = sandbox.stub().returns(restoreLoginBootstrapDeferred.promise)
      loadMetadataBootstrapStub = sandbox.stub().returns(loadMetadataBootstrapDeferred.promise)
    })
    it('should return a function which runs all bootstrappers when called and dispatches bootstrapFail action', function () {
      const bootstrap = createBootstrap({
        restoreLogin: restoreLoginBootstrapStub,
        loadMetadata: loadMetadataBootstrapStub
      })
      bootstrap({ dispatch: dispatchStub, getState: getStateStub })
      expect(restoreLoginBootstrapStub.calledOnce).to.equal(true)
      expect(restoreLoginBootstrapStub.firstCall.args[0].dispatch).to.equal(dispatchStub)
      expect(restoreLoginBootstrapStub.firstCall.args[0].getState).to.equal(getStateStub)
      expect(loadMetadataBootstrapStub.calledOnce).to.equal(true)
      expect(loadMetadataBootstrapStub.firstCall.args[0].dispatch).to.equal(dispatchStub)
      expect(loadMetadataBootstrapStub.firstCall.args[0].getState).to.equal(getStateStub)
      expect(dispatchStub.notCalled).to.equal(true)
      loadMetadataBootstrapDeferred.resolve()
      restoreLoginBootstrapDeferred.reject(new Error())
      return Promise
        .all([
          loadMetadataBootstrapDeferred.promise,
          restoreLoginBootstrapDeferred.promise
        ])
        .catch(() => {
          expect(dispatchStub.calledOnce).to.equal(true)
          expect(dispatchStub.firstCall.args[0]).to.equal(bootstrapFailStubResult)
        })
    })
  })
})
