import { expect } from 'chai'
import sinon from 'sinon'
import routeReducers from '../src/route.reducers'
import * as routeStatuses from '../src/route.statuses'

describe('route.reducers', function () {
  const sandbox = sinon.sandbox.create()
  beforeEach(function () {
    sandbox.restore()
  })

  afterEach(function () {
    sandbox.restore()
  })
  describe('routeLoading', function () {
    const state = {
      error: new Error('test')
    }
    it('should return a new state', function () {
      const action = { routeName: 'routeNameTest', routeState: 'routeStateTest' }
      const nextState = routeReducers.routeLoading(state, action)
      expect(state).to.not.equal(nextState)
    })
    it('should set the status to LOADING', function () {
      const action = { routeName: 'routeNameTest', routeState: 'routeStateTest' }
      const nextState = routeReducers.routeLoading(state, action)
      expect(nextState.status).to.equal(routeStatuses.LOADING)
    })
    it('should set the pendingRoute routeName to the routeName from the action', function () {
      const action = { routeName: 'routeNameTest', routeState: 'routeStateTest' }
      const nextState = routeReducers.routeLoading(state, action)
      expect(nextState.pendingRoute.routeName).to.equal(action.routeName)
    })
    it('should set the pendingRoute routeState to the routeState from the action', function () {
      const action = { routeName: 'routeNameTest', routeState: 'routeStateTest' }
      const nextState = routeReducers.routeLoading(state, action)
      expect(nextState.pendingRoute.routeState).to.equal(action.routeState)
    })
    it('should clear the error', function () {
      const action = { routeName: 'routeNameTest', routeState: 'routeStateTest' }
      const nextState = routeReducers.routeLoading(state, action)
      expect(nextState.error).to.not.exist
    })

    describe('given that there is not pendingRoute and no current route', function () {
      const state = {}
      it('should clear the previousRoute', function () {
        const action = { routeName: 'routeNameTest', routeState: 'routeStateTest' }
        const nextState = routeReducers.routeLoading(state, action)
        expect(nextState.previousRoute).to.not.exist
      })
    })
    describe('given that there is already a pendingRoute on the state', function () {
      const state = {
        pendingRoute: {
          routeName: 'routeNameTest',
          routeState: 'routeStateTest'
        }
      }
      it('should set the previousRoute to the value of the pendingRoute', function () {
        const action = { routeName: 'routeNameTest', routeState: 'routeStateTest' }
        const nextState = routeReducers.routeLoading(state, action)
        expect(nextState.previousRoute.routeName).to.equal(state.pendingRoute.routeName)
        expect(nextState.previousRoute.routeState).to.equal(state.pendingRoute.routeState)
      })
    })
    describe('given that there is no pendingRoute but there is already a current route', function () {
      const state = {
        routeName: 'routeNameTest',
        routeState: 'routeStateTest'
      }
      it('should set the previousRoute to be the current route', function () {
        const action = { routeName: 'routeNameTest', routeState: 'routeStateTest' }
        const nextState = routeReducers.routeLoading(state, action)
        expect(nextState.previousRoute.routeName).to.equal(state.routeName)
        expect(nextState.previousRoute.routeState).to.equal(state.routeState)
      })
    })
  })
  describe('pendingRouteReady', function () {
    const state = {
      pendingRoute: {
        routeName: 'routeNameTest',
        routeState: 'routeStateTest'
      },
      error: new Error('test')
    }
    it('should return a new state', function () {
      const action = {}
      const nextState = routeReducers.pendingRouteReady(state, action)
      expect(state).to.not.equal(nextState)
    })
    it('should set the status to READY', function () {
      const action = {}
      const nextState = routeReducers.pendingRouteReady(state, action)
      expect(nextState.status).to.equal(routeStatuses.READY)
    })
    it('should clear the error', function () {
      const action = {}
      const nextState = routeReducers.pendingRouteReady(state, action)
      expect(nextState.error).to.not.exist
    })
    it('should set the routeName to the pendingRoute routeName', function () {
      const action = {}
      const nextState = routeReducers.pendingRouteReady(state, action)
      expect(nextState.routeName).to.equal(state.pendingRoute.routeName)
    })
    it('should set the routeState to the pendingRoute routeState', function () {
      const action = {}
      const nextState = routeReducers.pendingRouteReady(state, action)
      expect(nextState.routeState).to.equal(state.pendingRoute.routeState)
    })
    it('should clear the pendingRoute', function () {
      const action = {}
      const nextState = routeReducers.pendingRouteReady(state, action)
      expect(nextState.pendingRoute).to.not.exist
    })
  })
  describe('pendingRouteAccessDenied', function () {
    const state = {}
    it('should return a new state', function () {
      const action = {}
      const nextState = routeReducers.pendingRouteAccessDenied(state, action)
      expect(state).to.not.equal(nextState)
    })
    it('should set the status to READY', function () {
      const action = {}
      const nextState = routeReducers.pendingRouteAccessDenied(state, action)
      expect(nextState.status).to.equal(routeStatuses.READY)
    })
    it('should clear the error', function () {
      const action = {}
      const nextState = routeReducers.pendingRouteAccessDenied(state, action)
      expect(nextState.error).to.not.exist
    })
  })
  describe('pendingRouteError', function () {
    const state = {}
    it('should return a new state', function () {
      const action = { error: new Error('test') }
      const nextState = routeReducers.pendingRouteError(state, action)
      expect(state).to.not.equal(nextState)
    })
    it('should set the status to ERROR', function () {
      const action = { error: new Error('test') }
      const nextState = routeReducers.pendingRouteError(state, action)
      expect(nextState.status).to.equal(routeStatuses.ERROR)
    })
    it('should set the error to the error from the action', function () {
      const action = { error: new Error('test') }
      const nextState = routeReducers.pendingRouteError(state, action)
      expect(nextState.error).to.equal(action.error)
    })
  })
})


  // describe('validating', function () {
  //   const state = {
  //     testForm: {
  //       testField: {}
  //     }
  //   }
  //   it('should return a new state', function () {
  //     const action = { formName: 'testForm', fieldName: 'testField' }
  //     const nextState = formReducers.validating(state, action)
  //     expect(state).to.not.equal(nextState)
  //   })
  //   it('should set the form to validating', function () {
  //     const action = { formName: 'testForm', fieldName: 'testField' }
  //     const nextState = formReducers.validating(state, action)
  //     expect(nextState.testForm.status).to.equal(formStatuses.VALIDATING)
  //   })
  //   it('should set the field to validating', function () {
  //     const action = { formName: 'testForm', fieldName: 'testField' }
  //     const nextState = formReducers.validating(state, action)
  //     expect(nextState.testForm.testField.status).to.equal(formStatuses.VALIDATING)
  //   })
  // })