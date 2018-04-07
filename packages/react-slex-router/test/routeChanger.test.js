import { expect } from 'chai'
import sinon from 'sinon'
import actions from '../src/route.actions'
import routeChanger from '../src/routeChanger'

describe('routeChanger', function () {
  this.timeout(3000000)
  const sandbox = sinon.sandbox.create()
  beforeEach(function () {
    sandbox.restore()
  })

  afterEach(function () {
    sandbox.restore()
  })
  describe('when the current route is the same as the one given', function () {
    let params
    let dispatchStub
    let getStateStub
    beforeEach(function () {
      dispatchStub = sandbox.stub()
      getStateStub = sandbox.stub().returns({
        route: {
          routeState: {
            path: 'testRoutePath'
          }
        }
      })
      params = { dispatch: dispatchStub, getState: getStateStub, routeName: 'testRouteName', routeState: { path: 'testRoutePath' } }
    })
    it('should do nothing', function () {
      routeChanger.changeRoute(params)
      expect(dispatchStub.called).to.equal(false)
    })
  })
  describe('when the current route is different to the one provided', function () {
    describe('given that the async validation succeeds', function () {
      describe('when the route is still pending', function () {
        describe('and the route is valid', function () {
          let params
          let dispatchStub
          let getStateStub
          let validatorStub
          let routeLoadingStub
          let pendingRouteReadyStub
          const routeLoadingStubAction = {}
          const pendingRouteReadyStubAction = {}
          beforeEach(function () {
            routeLoadingStub = sandbox.stub(actions, 'routeLoading').returns(routeLoadingStubAction)
            pendingRouteReadyStub = sandbox.stub(actions, 'pendingRouteReady').returns(pendingRouteReadyStubAction)
            validatorStub = sandbox.stub().returns(Promise.resolve(true))
            dispatchStub = sandbox.stub()
            getStateStub = sandbox.stub().returns({
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
            })
            params = { dispatch: dispatchStub, getState: getStateStub, validate: validatorStub, routeName: 'testRouteName', routeState: { path: 'testPendingRoutePath' } }
          })
          it('should dispatch a routeLoading action', function () {
            return routeChanger
              .changeRoute(params)
              .then(() => {
                expect(dispatchStub.callCount).to.equal(2)
                expect(routeLoadingStub.callCount).to.equal(1)
                expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
              })
          })
          it('should dispatch a pendingRouteReady', function () {
            return routeChanger
              .changeRoute(params)
              .then(() => {
                expect(validatorStub.callCount).to.equal(1)
                expect(dispatchStub.callCount).to.equal(2)
                expect(pendingRouteReadyStub.callCount).to.equal(1)
                expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
                expect(dispatchStub.secondCall.args[0]).to.equal(pendingRouteReadyStubAction)
              })
          })
        })
        describe('and the route is invalid', function () {
          let params
          let dispatchStub
          let getStateStub
          let validatorStub
          let routeLoadingStub
          let pendingRouteAccessDeniedStub
          const routeLoadingStubAction = {}
          const pendingRouteAccessDeniedStubAction = {}
          beforeEach(function () {
            routeLoadingStub = sandbox.stub(actions, 'routeLoading').returns(routeLoadingStubAction)
            pendingRouteAccessDeniedStub = sandbox.stub(actions, 'pendingRouteAccessDenied').returns(pendingRouteAccessDeniedStubAction)
            validatorStub = sandbox.stub().returns(Promise.resolve(false))
            dispatchStub = sandbox.stub()
            getStateStub = sandbox.stub().returns({
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
            })
            params = { dispatch: dispatchStub, getState: getStateStub, validate: validatorStub, routeName: 'testRouteName', routeState: { path: 'testPendingRoutePath' } }
          })
          it('should dispatch a routeLoading action', function () {
            return routeChanger
              .changeRoute(params)
              .then(() => {
                expect(dispatchStub.callCount).to.equal(2)
                expect(routeLoadingStub.callCount).to.equal(1)
                expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
              })
          })
          it('should dispatch a pendingRouteAccessDenied', function () {
            return routeChanger
              .changeRoute(params)
              .then(() => {
                expect(validatorStub.callCount).to.equal(1)
                expect(dispatchStub.callCount).to.equal(2)
                expect(pendingRouteAccessDeniedStub.callCount).to.equal(1)
                expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
                expect(dispatchStub.secondCall.args[0]).to.equal(pendingRouteAccessDeniedStubAction)
              })
          })
        })
      })
      describe('and the route is no longer pending', function () {
        let params
        let dispatchStub
        let getStateStub
        let validatorStub
        let routeLoadingStub
        let pendingRouteAccessDeniedStub
        const routeLoadingStubAction = {}
        const pendingRouteAccessDeniedStubAction = {}
        beforeEach(function () {
          routeLoadingStub = sandbox.stub(actions, 'routeLoading').returns(routeLoadingStubAction)
          pendingRouteAccessDeniedStub = sandbox.stub(actions, 'pendingRouteAccessDenied').returns(pendingRouteAccessDeniedStubAction)
          validatorStub = sandbox.stub().returns(Promise.resolve(false))
          dispatchStub = sandbox.stub()
          getStateStub = sandbox.stub().returns({
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
          })
          params = { dispatch: dispatchStub, getState: getStateStub, validate: validatorStub, routeName: 'testRouteName', routeState: { path: 'newPath' } }
        })
        it('should only dispatch a routeLoading action', function () {
          return routeChanger
            .changeRoute(params)
            .then(() => {
              expect(dispatchStub.callCount).to.equal(1)
              expect(routeLoadingStub.callCount).to.equal(1)
              expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
            })
        })
      })
    })
    describe('given that the async validation fails', function () {
      describe('and the route is still pending', function () {
        let params
        let dispatchStub
        let getStateStub
        let validatorStub
        let routeLoadingStub
        let pendingRouteErrorStub
        const validateError = new Error('testError')
        const routeLoadingStubAction = {}
        const pendingRouteErrorStubAction = {}
        beforeEach(function () {
          routeLoadingStub = sandbox.stub(actions, 'routeLoading').returns(routeLoadingStubAction)
          pendingRouteErrorStub = sandbox.stub(actions, 'pendingRouteError').returns(pendingRouteErrorStubAction)
          validatorStub = sandbox.stub().returns(Promise.reject(validateError))
          dispatchStub = sandbox.stub()
          getStateStub = sandbox.stub().returns({
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
          })
          params = { dispatch: dispatchStub, getState: getStateStub, validate: validatorStub, routeName: 'testRouteName', routeState: { path: 'testPendingRoutePath' } }
        })
        it('should dispatch a pendingRouteError', function () {
          return routeChanger
            .changeRoute(params)
            .then(() => {
              throw new Error('should have rejected')
            })
            .catch((error) => {
              expect(error.message).to.not.equal('should have rejected')
              expect(validatorStub.callCount).to.equal(1)
              expect(dispatchStub.callCount).to.equal(2)
              expect(pendingRouteErrorStub.callCount).to.equal(1)
              expect(pendingRouteErrorStub.firstCall.args[0].error).to.equal(validateError.message)
              expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
              expect(dispatchStub.secondCall.args[0]).to.equal(pendingRouteErrorStubAction)
            })
        })
      })
      describe('and the route is no longer pending', function () {
        let params
        let dispatchStub
        let getStateStub
        let validatorStub
        let routeLoadingStub
        let pendingRouteErrorStub
        const validateError = new Error('testError')
        const routeLoadingStubAction = {}
        const pendingRouteErrorStubAction = {}
        beforeEach(function () {
          routeLoadingStub = sandbox.stub(actions, 'routeLoading').returns(routeLoadingStubAction)
          pendingRouteErrorStub = sandbox.stub(actions, 'pendingRouteError').returns(pendingRouteErrorStubAction)
          validatorStub = sandbox.stub().returns(Promise.reject(validateError))
          dispatchStub = sandbox.stub()
          getStateStub = sandbox.stub().returns({
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
          })
          params = { dispatch: dispatchStub, getState: getStateStub, validate: validatorStub, routeName: 'testRouteName', routeState: { path: 'newPath' } }
        })
        it('should only dispatch a routeLoading action', function () {
          return routeChanger
            .changeRoute(params)
            .then(() => {
              expect(dispatchStub.callCount).to.equal(1)
              expect(routeLoadingStub.callCount).to.equal(1)
              expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
            })
        })
      })
    })
  })
})


// import React, { Component } from 'react'
// import { mount, configure } from 'enzyme'
// import ReactSixteenAdapter from 'enzyme-adapter-react-16'
// import { expect } from 'chai'
// import sinon from 'sinon'
// import reduceRoute from '../src'
// import actions from '../src/route.actions'
// import routeChanger from '../src/routeChanger'
// import * as routeStatuses from '../src/route.statuses'
// import slexStore from 'slex-store'
// import slexRouter from 'slex-router'

// // need adapter to work with react ^16
// configure({ adapter: new ReactSixteenAdapter() })

// describe('Router', function () {
//   this.timeout(3000000)
//   const sandbox = sinon.sandbox.create()
//   beforeEach(function () {
//     sandbox.restore()
//   })
//   afterEach(function () {
//     sandbox.restore()
//   })
//   describe('changeRoute', function () {
//     describe('when the current route is the same as the one given', function () {
//       let params
//       let dispatchStub
//       let getStateStub
//       beforeEach(function () {
//         dispatchStub = sandbox.stub()
//         getStateStub = sandbox.stub().returns({
//           route: {
//             routeState: {
//               path: 'testRoutePath'
//             }
//           }
//         })
//         params = { dispatch: dispatchStub, getState: getStateStub, routeName: 'testRouteName', routeState: { path: 'testRoutePath' } }
//       })
//       it('should do nothing', function () {
//         routeChanger.changeRoute(params)
//         expect(dispatchStub.called).to.equal(false)
//       })
//     })
//     describe('when the current route is different to the one provided', function () {
//       let params
//       let dispatchStub
//       let getStateStub
//       let validatorStub
//       let routeLoadingStub
//       const routeLoadingStubAction = {}
//       beforeEach(function () {
//         routeLoadingStub = sandbox.stub(actions, 'routeLoading').returns(routeLoadingStubAction)
//         validatorStub = sandbox.stub().returns(Promise.resolve(true))
//         dispatchStub = sandbox.stub()
//         getStateStub = sandbox.stub().returns({
//           route: {
//             routeState: {
//               path: 'testRoutePath'
//             },
//             pendingRoute: {
//               routeName: 'testPendingRouteName',
//               routeState: {
//                 path: 'testPendingRoutePath'
//               }
//             }
//           }
//         })
//         params = { dispatch: dispatchStub, getState: getStateStub, validate: validatorStub, routeName: 'testRouteName', routeState: { path: 'newPath' } }
//       })
//       it('should dispatch a routeLoading action', function () {
//         routeChanger.changeRoute(params)
//         expect(dispatchStub.callCount).to.equal(1)
//         expect(routeLoadingStub.callCount).to.equal(1)
//         expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
//       })


//       describe('given that the async validation succeeds', function () {
//         describe('when the route is still pending', function () {
//           describe('and the route is valid', function () {
//             let validatorStub

//             beforeEach(function () {
//               validatorStub = sandbox.stub().returns(Promise.resolve(true))
//             })
//             it('should dispatch a pendingRouteReady', function () {
//               const routeLoadingStubAction = {}
//               const pendingRouteReadyStubAction = {}
//               const action = actions.changeRoute({ validate: validatorStub, ...state.route.pendingRoute })
//               const dispatchStub = sandbox.stub()
//               const getStateStub = sandbox.stub().returns(state)
//               sandbox.stub(actions, 'routeLoading').returns(routeLoadingStubAction)
//               const pendingRouteReadyStub = sandbox.stub(actions, 'pendingRouteReady').returns(pendingRouteReadyStubAction)
//               routeChanger.changeRouteMiddleware(dispatchStub, getStateStub, action)
//               return validatorStub.firstCall.returnValue
//                 .then(() => {
//                   expect(validatorStub.callCount).to.equal(1)
//                   expect(dispatchStub.callCount).to.equal(2)
//                   expect(pendingRouteReadyStub.callCount).to.equal(1)
//                   expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
//                   expect(dispatchStub.secondCall.args[0]).to.equal(pendingRouteReadyStubAction)
//                 })
//             })
//           })
//           describe('and the route is invalid', function () {
//             let validatorStub

//             beforeEach(function () {
//               validatorStub = sandbox.stub().returns(Promise.resolve(false))
//             })
//             it('should dispatch a pendingRouteAccessDenied', function () {
//               const routeLoadingStubAction = {}
//               const pendingRouteAccessDeniedStubAction = {}
//               const action = actions.changeRoute({ validate: validatorStub, ...state.route.pendingRoute })
//               const dispatchStub = sandbox.stub()
//               const getStateStub = sandbox.stub().returns(state)
//               sandbox.stub(actions, 'routeLoading').returns(routeLoadingStubAction)
//               const pendingRouteAccessDeniedStub = sandbox.stub(actions, 'pendingRouteAccessDenied').returns(pendingRouteAccessDeniedStubAction)
//               routeChanger.changeRouteMiddleware(dispatchStub, getStateStub, action)
//               return validatorStub.firstCall.returnValue
//                 .then(() => {
//                   expect(validatorStub.callCount).to.equal(1)
//                   expect(dispatchStub.callCount).to.equal(2)
//                   expect(pendingRouteAccessDeniedStub.callCount).to.equal(1)
//                   expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
//                   expect(dispatchStub.secondCall.args[0]).to.equal(pendingRouteAccessDeniedStubAction)
//                 })
//             })
//           })
//         })
//         describe('and the route is no longer pending', function () {
//           let validatorStub
//           beforeEach(function () {
//             validatorStub = sandbox.stub().returns(Promise.resolve(true))
//           })
//           it('should do nothing', function () {
//             const routeLoadingStubAction = {}
//             const action = actions.changeRoute({ validate: validatorStub, routeName: 'anotherRouteName', routeState: { path: 'anotherRoutePath' } })
//             const dispatchStub = sandbox.stub()
//             const getStateStub = sandbox.stub().returns(state)
//             sandbox.stub(actions, 'routeLoading').returns(routeLoadingStubAction)
//             routeChanger.changeRouteMiddleware(dispatchStub, getStateStub, action)
//             return validatorStub.firstCall.returnValue
//               .then(() => {
//                 expect(dispatchStub.callCount).to.equal(1)
//                 expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
//               })
//           })
//         })
//       })
//     })
//   })
// })


  
//   //       describe('given that the async validation fails', function () {
//   //         const validateError = new Error('testError')
//   //         let validatorStub
//   //         beforeEach(function () {
//   //           validatorStub = sandbox.stub().returns(Promise.reject(validateError))
//   //         })
//   //         describe('and the route is still pending', function () {
//   //           it('should dispatch a pendingRouteError', function () {
//   //             const routeLoadingStubAction = {}
//   //             const pendingRouteErrorStubAction = {}
//   //             const action = actions.changeRoute({ validate: validatorStub, ...state.route.pendingRoute })
//   //             const dispatchStub = sandbox.stub()
//   //             const getStateStub = sandbox.stub().returns(state)
//   //             sandbox.stub(actions, 'routeLoading').returns(routeLoadingStubAction)
//   //             const pendingRouteErrorStub = sandbox.stub(actions, 'pendingRouteError').returns(pendingRouteErrorStubAction)
//   //             routeChanger.changeRouteMiddleware(dispatchStub, getStateStub, action)
//   //             return validatorStub.firstCall.returnValue
//   //               .catch(error => error)
//   //               .then(() => {
//   //                 expect(validatorStub.callCount).to.equal(1)
//   //                 expect(dispatchStub.callCount).to.equal(2)
//   //                 expect(pendingRouteErrorStub.callCount).to.equal(1)
//   //                 expect(pendingRouteErrorStub.firstCall.args[0].error).to.equal(validateError)
//   //                 expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
//   //                 expect(dispatchStub.secondCall.args[0]).to.equal(pendingRouteErrorStubAction)
//   //               })
//   //           })
//   //         })
//   //         describe('and the route is no longer pending', function () {
//   //           it('should do nothing', function () {
//   //             const routeLoadingStubAction = {}
//   //             const pendingRouteErrorStubAction = {}
//   //             const action = actions.changeRoute({ validate: validatorStub, routeName: 'anotherRouteName', routeState: { path: 'anotherRoutePath' } })
//   //             const dispatchStub = sandbox.stub()
//   //             const getStateStub = sandbox.stub().returns(state)
//   //             sandbox.stub(actions, 'routeLoading').returns(routeLoadingStubAction)
//   //             const pendingRouteErrorStub = sandbox.stub(actions, 'pendingRouteError').returns(pendingRouteErrorStubAction)
//   //             routeChanger.changeRouteMiddleware(dispatchStub, getStateStub, action)
//   //             return validatorStub.firstCall.returnValue
//   //               .catch(error => error)
//   //               .then(() => {
//   //                 expect(validatorStub.callCount).to.equal(1)
//   //                 expect(dispatchStub.callCount).to.equal(1)
//   //                 expect(pendingRouteErrorStub.callCount).to.equal(0)
//   //                 expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
//   //               })
//   //           })
//   //         })
//   //       })
//   //     })
//   //   })
//   // })