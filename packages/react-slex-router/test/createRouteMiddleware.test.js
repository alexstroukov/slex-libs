import { expect } from 'chai'
import sinon from 'sinon'
import actions from '../src/route.actions'
import createRouteMiddleware from '../src/createRouteMiddleware'

describe('createRouteMiddleware', function () {
  const sandbox = sinon.sandbox.create()
  beforeEach(function () {
    sandbox.restore()
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('createRouteMiddleware', function () {
    it('should return an object', function () {
      const validatorsStub = new class { testValidate = sandbox.stub().returns(Promise.resolve(true)) }
      const routeMiddleware = createRouteMiddleware({ validators: validatorsStub })
      expect(routeMiddleware !== null && typeof routeMiddleware === 'object').to.equal(true)
    })
    describe('changeRouteMiddleware', function () {
      describe('given that the action is change route', function () {
        describe('when the current route is the same as the one given', function () {
          const validatorsStub = new class { testValidate = sandbox.stub().returns(Promise.resolve(true)) }
          const routeMiddleware = createRouteMiddleware({ validators: validatorsStub })
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
            const action = actions.changeRoute({ routeName: 'testRouteName', routeState: { path: 'testRoutePath' } })
            const dispatchStub = sandbox.stub()
            const getStateStub = sandbox.stub().returns(state)
            const actionResult = routeMiddleware.changeRouteMiddleware(dispatchStub, getStateStub, action)
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
            const validatorsStub = new class { testValidate = sandbox.stub().returns(Promise.resolve(true)) }
            const routeMiddleware = createRouteMiddleware({ validators: validatorsStub })
            const routeLoadingStubAction = {}
            const action = actions.changeRoute({ validate: 'testValidate', routeName: 'testRouteName', routeState: { path: 'newPath' } })
            const dispatchStub = sandbox.stub()
            const getStateStub = sandbox.stub().returns(state)
            const routeLoadingStub = sandbox.stub(actions, 'routeLoading').returns(routeLoadingStubAction)
            routeMiddleware.changeRouteMiddleware(dispatchStub, getStateStub, action)
            expect(dispatchStub.callCount).to.equal(1)
            expect(routeLoadingStub.callCount).to.equal(1)
            expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
          })
    
          describe('given that the async validation succeeds', function () {
            describe('when the route is still pending', function () {
              describe('and the route is valid', function () {
                let validatorsStub
                let routeMiddleware
                beforeEach(function () {
                  validatorsStub = new class { testValidate = sandbox.stub().returns(Promise.resolve(true)) }
                  routeMiddleware = createRouteMiddleware({ validators: validatorsStub })
                })
                it('should dispatch a pendingRouteReady', function () {
                  const routeLoadingStubAction = {}
                  const pendingRouteReadyStubAction = {}
                  const action = actions.changeRoute({ validate: 'testValidate', ...state.route.pendingRoute })
                  const dispatchStub = sandbox.stub()
                  const getStateStub = sandbox.stub().returns(state)
                  sandbox.stub(actions, 'routeLoading').returns(routeLoadingStubAction)
                  const pendingRouteReadyStub = sandbox.stub(actions, 'pendingRouteReady').returns(pendingRouteReadyStubAction)
                  routeMiddleware.changeRouteMiddleware(dispatchStub, getStateStub, action)
                  return validatorsStub.testValidate.firstCall.returnValue
                    .then(() => {
                      expect(validatorsStub.testValidate.callCount).to.equal(1)
                      expect(dispatchStub.callCount).to.equal(2)
                      expect(pendingRouteReadyStub.callCount).to.equal(1)
                      expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
                      expect(dispatchStub.secondCall.args[0]).to.equal(pendingRouteReadyStubAction)
                    })
                })
              })
              describe('and the route is invalid', function () {
                let validatorsStub
                let routeMiddleware
                beforeEach(function () {
                  validatorsStub = new class { testValidate = sandbox.stub().returns(Promise.resolve(false)) }
                  routeMiddleware = createRouteMiddleware({ validators: validatorsStub })
                })
                it('should dispatch a pendingRouteAccessDenied', function () {
                  const routeLoadingStubAction = {}
                  const pendingRouteAccessDeniedStubAction = {}
                  const action = actions.changeRoute({ validate: 'testValidate', ...state.route.pendingRoute })
                  const dispatchStub = sandbox.stub()
                  const getStateStub = sandbox.stub().returns(state)
                  sandbox.stub(actions, 'routeLoading').returns(routeLoadingStubAction)
                  const pendingRouteAccessDeniedStub = sandbox.stub(actions, 'pendingRouteAccessDenied').returns(pendingRouteAccessDeniedStubAction)
                  routeMiddleware.changeRouteMiddleware(dispatchStub, getStateStub, action)
                  return validatorsStub.testValidate.firstCall.returnValue
                    .then(() => {
                      expect(validatorsStub.testValidate.callCount).to.equal(1)
                      expect(dispatchStub.callCount).to.equal(2)
                      expect(pendingRouteAccessDeniedStub.callCount).to.equal(1)
                      expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
                      expect(dispatchStub.secondCall.args[0]).to.equal(pendingRouteAccessDeniedStubAction)
                    })
                })
              })
            })
            describe('and the route is no longer pending', function () {
              let validatorsStub
              let routeMiddleware
              beforeEach(function () {
                validatorsStub = new class { testValidate = sandbox.stub().returns(Promise.resolve(true)) }
                routeMiddleware = createRouteMiddleware({ validators: validatorsStub })
              })
              it('should do nothing', function () {
                const routeLoadingStubAction = {}
                const action = actions.changeRoute({ validate: 'testValidate', routeName: 'anotherRouteName', routeState: { path: 'anotherRoutePath' } })
                const dispatchStub = sandbox.stub()
                const getStateStub = sandbox.stub().returns(state)
                sandbox.stub(actions, 'routeLoading').returns(routeLoadingStubAction)
                routeMiddleware.changeRouteMiddleware(dispatchStub, getStateStub, action)
                return validatorsStub.testValidate.firstCall.returnValue
                  .then(() => {
                    expect(dispatchStub.callCount).to.equal(1)
                    expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
                  })
              })
            })
          })
    
          describe('given that the async validation fails', function () {
            const validateError = new Error('testError')
            let validatorsStub
            let routeMiddleware
            beforeEach(function () {
              validatorsStub = new class { testValidate = sandbox.stub().returns(Promise.reject(validateError)) }
              routeMiddleware = createRouteMiddleware({ validators: validatorsStub })
            })
            describe('and the route is still pending', function () {
              it('should dispatch a pendingRouteError', function () {
                const routeLoadingStubAction = {}
                const pendingRouteErrorStubAction = {}
                const action = actions.changeRoute({ validate: 'testValidate', ...state.route.pendingRoute })
                const dispatchStub = sandbox.stub()
                const getStateStub = sandbox.stub().returns(state)
                sandbox.stub(actions, 'routeLoading').returns(routeLoadingStubAction)
                const pendingRouteErrorStub = sandbox.stub(actions, 'pendingRouteError').returns(pendingRouteErrorStubAction)
                routeMiddleware.changeRouteMiddleware(dispatchStub, getStateStub, action)
                return validatorsStub.testValidate.firstCall.returnValue
                  .catch(error => error)
                  .then(() => {
                    expect(validatorsStub.testValidate.callCount).to.equal(1)
                    expect(dispatchStub.callCount).to.equal(2)
                    expect(pendingRouteErrorStub.callCount).to.equal(1)
                    expect(pendingRouteErrorStub.firstCall.args[0].error).to.equal(validateError)
                    expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
                    expect(dispatchStub.secondCall.args[0]).to.equal(pendingRouteErrorStubAction)
                  })
              })
            })
            describe('and the route is no longer pending', function () {
              it('should do nothing', function () {
                const routeLoadingStubAction = {}
                const pendingRouteErrorStubAction = {}
                const action = actions.changeRoute({ validate: 'testValidate', routeName: 'anotherRouteName', routeState: { path: 'anotherRoutePath' } })
                const dispatchStub = sandbox.stub()
                const getStateStub = sandbox.stub().returns(state)
                sandbox.stub(actions, 'routeLoading').returns(routeLoadingStubAction)
                const pendingRouteErrorStub = sandbox.stub(actions, 'pendingRouteError').returns(pendingRouteErrorStubAction)
                routeMiddleware.changeRouteMiddleware(dispatchStub, getStateStub, action)
                return validatorsStub.testValidate.firstCall.returnValue
                  .catch(error => error)
                  .then(() => {
                    expect(validatorsStub.testValidate.callCount).to.equal(1)
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
  })

})
