import { expect } from 'chai'
import sinon from 'sinon'
import routeActions from '../src/route.actions'

describe('route.actions', function () {
  const sandbox = sinon.sandbox.create()
  beforeEach(function () {
    sandbox.restore()
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('routeLoading', function () {
    it('should create an object action', function () {
      const params = { routeName: 'testRouteName', routeState: { path: 'testRoutePath' } }
      const routeLoadingAction = routeActions.routeLoading(params)
      expect(routeLoadingAction !== null && typeof routeLoadingAction === 'object').to.equal(true)
    })
    it('should include the given routeName in the returned object', function () {
      const params = { routeName: 'testRouteName', routeState: { path: 'testRoutePath' } }
      const routeLoadingAction = routeActions.routeLoading(params)
      expect(routeLoadingAction.routeName).to.equal(params.routeName)
    })
    it('should include the given routeState in the returned object', function () {
      const params = { routeName: 'testRouteName', routeState: { path: 'testRoutePath' } }
      const routeLoadingAction = routeActions.routeLoading(params)
      expect(routeLoadingAction.routeState).to.equal(params.routeState)
    })
  })

  describe('pendingRouteReady', function () {
    it('should create an object action', function () {
      const pendingRouteReadyAction = routeActions.pendingRouteReady()
      expect(pendingRouteReadyAction !== null && typeof pendingRouteReadyAction === 'object').to.equal(true)
    })
  })
  describe('pendingRouteAccessDenied', function () {
    it('should create an object action', function () {
      const pendingRouteAccessDeniedAction = routeActions.pendingRouteAccessDenied()
      expect(pendingRouteAccessDeniedAction !== null && typeof pendingRouteAccessDeniedAction === 'object').to.equal(true)
    })
  })
  describe('pendingRouteError', function () {
    it('should create an object action', function () {
      const params = { error: new Error('testMessage') }
      const pendingRouteErrorAction = routeActions.pendingRouteError(params)
      expect(pendingRouteErrorAction !== null && typeof pendingRouteErrorAction === 'object').to.equal(true)
    })
    it('should include the given error in the returned object', function () {
      const params = { error: new Error('testMessage') }
      const routeLoadingAction = routeActions.pendingRouteError(params)
      expect(routeLoadingAction.error).to.equal(params.error)
    })
  })

  describe('changeRoute', function () {
    it('should create an function action', function () {
      const params = { error: new Error('testMessage') }
      const changeRouteAction = routeActions.changeRoute(params)
      expect(typeof changeRouteAction === 'function').to.equal(true)
    })
    describe('when the current route is the same as the one given', function () {
      let state
      beforeEach(function () {
        state = {
          route: {
            routeState: {
              path: 'testRoutePath'
            }
          }
        }
      })
      it('should do nothing', function () {
        const params = { routeName: 'testRouteName', routeState: { path: 'testRoutePath' } }
        const dispatchStub = sandbox.stub()
        const getStateStub = sandbox.stub().returns(state)
        const changeRouteAction = routeActions.changeRoute(params)
        const actionResult = changeRouteAction(dispatchStub, getStateStub)
        expect(actionResult).to.equal(undefined)
        expect(dispatchStub.called).to.equal(false)
      })
    })
    describe('when the current route is different to the one given', function () {
      let state
      beforeEach(function () {
        state = {
          route: {
            routeState: {
              path: 'testRoutePath'
            },
            pendingRoute: {
              routeName: 'testPendingRouteName',
              routeState: {
                path: 'testPendingRoutePath'
              }
            }
          }
        }
      })

      it('should dispatch a routeLoading action', function () {
        const routeLoadingStubAction = {}
        const validateRouteStub = sandbox.stub().returns(new Promise(() => {}))
        const params = { routeName: 'testRouteName', routeState: { path: 'newPath' } }
        const dispatchStub = sandbox.stub()
        const getStateStub = sandbox.stub().returns(state)
        const routeLoadingStub = sandbox.stub(routeActions, 'routeLoading').returns(routeLoadingStubAction)
        const changeRouteAction = routeActions.changeRoute({ ...params, validateRoute: validateRouteStub })
        changeRouteAction(dispatchStub, getStateStub)
        expect(dispatchStub.callCount).to.equal(1)
        expect(routeLoadingStub.callCount).to.equal(1)
        expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
      })

      describe('given that the async validation succeeds', function () {
        describe('when the route is still pending', function () {
          describe('and the route is valid', function () {
            let validateRouteStub
            beforeEach(function () {
              validateRouteStub = sandbox.stub().returns(Promise.resolve(true))
            })
            it('should dispatch a pendingRouteReady', function () {
              const routeLoadingStubAction = {}
              const pendingRouteReadyStubAction = {}
              const params = state.route.pendingRoute
              const dispatchStub = sandbox.stub()
              const getStateStub = sandbox.stub().returns(state)
              sandbox.stub(routeActions, 'routeLoading').returns(routeLoadingStubAction)
              const pendingRouteReadyStub = sandbox.stub(routeActions, 'pendingRouteReady').returns(pendingRouteReadyStubAction)
              const changeRouteAction = routeActions.changeRoute({ ...params, validateRoute: validateRouteStub })
              changeRouteAction(dispatchStub, getStateStub)
              return validateRouteStub.firstCall.returnValue
                .then(() => {
                  expect(validateRouteStub.callCount).to.equal(1)
                  expect(dispatchStub.callCount).to.equal(2)
                  expect(pendingRouteReadyStub.callCount).to.equal(1)
                  expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
                  expect(dispatchStub.secondCall.args[0]).to.equal(pendingRouteReadyStubAction)
                })
            })
          })
          describe('and the route is invalid', function () {
            let validateRouteStub
            beforeEach(function () {
              validateRouteStub = sandbox.stub().returns(Promise.resolve(false))
            })
            it('should dispatch a pendingRouteAccessDenied', function () {
              const routeLoadingStubAction = {}
              const pendingRouteAccessDeniedStubAction = {}
              const params = state.route.pendingRoute
              const dispatchStub = sandbox.stub()
              const getStateStub = sandbox.stub().returns(state)
              sandbox.stub(routeActions, 'routeLoading').returns(routeLoadingStubAction)
              const pendingRouteAccessDeniedStub = sandbox.stub(routeActions, 'pendingRouteAccessDenied').returns(pendingRouteAccessDeniedStubAction)
              const changeRouteAction = routeActions.changeRoute({ ...params, validateRoute: validateRouteStub })
              changeRouteAction(dispatchStub, getStateStub)
              return validateRouteStub.firstCall.returnValue
                .then(() => {
                  expect(validateRouteStub.callCount).to.equal(1)
                  expect(dispatchStub.callCount).to.equal(2)
                  expect(pendingRouteAccessDeniedStub.callCount).to.equal(1)
                  expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
                  expect(dispatchStub.secondCall.args[0]).to.equal(pendingRouteAccessDeniedStubAction)
                })
            })
          })
        })
        describe('and the route is no longer pending', function () {
          it('should do nothing', function () {
            const routeLoadingStubAction = {}
            const validateRouteStub = sandbox.stub().returns(Promise.resolve(true))
            const params = { routeName: 'anotherRouteName', routeState: { path: 'anotherRoutePath' } }
            const dispatchStub = sandbox.stub()
            const getStateStub = sandbox.stub().returns(state)
            sandbox.stub(routeActions, 'routeLoading').returns(routeLoadingStubAction)
            const changeRouteAction = routeActions.changeRoute({ ...params, validateRoute: validateRouteStub })
            changeRouteAction(dispatchStub, getStateStub)
            return validateRouteStub.firstCall.returnValue
              .then(() => {
                expect(dispatchStub.callCount).to.equal(1)
                expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
              })
          })
        })
      })

      describe('given that the async validation fails', function () {
        const validateRouteError = new Error('testError')
        let validateRouteStub
        beforeEach(function () {
          validateRouteStub = sandbox.stub().returns(Promise.reject(validateRouteError))
        })
        describe('and the route is still pending', function () {
          it('should dispatch a pendingRouteError', function () {
            const routeLoadingStubAction = {}
            const pendingRouteErrorStubAction = {}
            const params = state.route.pendingRoute
            const dispatchStub = sandbox.stub()
            const getStateStub = sandbox.stub().returns(state)
            sandbox.stub(routeActions, 'routeLoading').returns(routeLoadingStubAction)
            const pendingRouteErrorStub = sandbox.stub(routeActions, 'pendingRouteError').returns(pendingRouteErrorStubAction)
            const changeRouteAction = routeActions.changeRoute({ ...params, validateRoute: validateRouteStub })
            changeRouteAction(dispatchStub, getStateStub)
            return validateRouteStub.firstCall.returnValue
              .catch(error => error)
              .then(() => {
                expect(validateRouteStub.callCount).to.equal(1)
                expect(dispatchStub.callCount).to.equal(2)
                expect(pendingRouteErrorStub.callCount).to.equal(1)
                expect(pendingRouteErrorStub.firstCall.args[0].error).to.equal(validateRouteError)
                expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
                expect(dispatchStub.secondCall.args[0]).to.equal(pendingRouteErrorStubAction)
              })
          })
        })
        describe('and the route is no longer pending', function () {
          it('should do nothing', function () {
            const routeLoadingStubAction = {}
            const pendingRouteErrorStubAction = {}
            const params = { routeName: 'anotherRouteName', routeState: { path: 'anotherRoutePath' } }
            const dispatchStub = sandbox.stub()
            const getStateStub = sandbox.stub().returns(state)
            sandbox.stub(routeActions, 'routeLoading').returns(routeLoadingStubAction)
            const pendingRouteErrorStub = sandbox.stub(routeActions, 'pendingRouteError').returns(pendingRouteErrorStubAction)
            const changeRouteAction = routeActions.changeRoute({ ...params, validateRoute: validateRouteStub })
            changeRouteAction(dispatchStub, getStateStub)
            return validateRouteStub.firstCall.returnValue
              .catch(error => error)
              .then(() => {
                expect(validateRouteStub.callCount).to.equal(1)
                expect(dispatchStub.callCount).to.equal(1)
                expect(pendingRouteErrorStub.callCount).to.equal(0)
                expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
              })
          })
        })
      })
    })
  })
})
