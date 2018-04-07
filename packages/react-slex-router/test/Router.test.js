import React, { Component } from 'react'
import { mount, configure } from 'enzyme'
import ReactSixteenAdapter from 'enzyme-adapter-react-16'
import { expect } from 'chai'
import sinon from 'sinon'
import Router from '../src/Router'
import Route from '../src/Route'
import reduceRoute from '../src'
import routeActions from '../src/route.actions'
import * as routeStatuses from '../src/route.statuses'
import slexStore from 'slex-store'
import slexRouter from 'slex-router'

// need adapter to work with react ^16
configure({ adapter: new ReactSixteenAdapter() })

describe('Router', function () {
  this.timeout(3000000)
  const sandbox = sinon.sandbox.create()
  beforeEach(function () {
    sandbox.restore()
  })
  afterEach(function () {
    sandbox.restore()
  })
  describe('when unmounting', function () {
    let store
    let wrapper
    let router
    let dispatchSpy
    let createStreamSpy
    let changeRouteStub
    let routeStreamDisposeStub
    const baseRoute = {
      path: '/',
      name: 'base',
      validate: () => {}
    }
    const homeRoute = {
      path: '/home',
      name: 'home',
      validate: () => {}
    }
    beforeEach(function () {
      store =
        slexStore.createStore(
          slexStore.createDispatch({
            reducer: slexStore.createReducer({
              route: reduceRoute
            })
          })
        )
      dispatchSpy = sandbox.spy(store, 'dispatch')
      createStreamSpy = sandbox.spy(slexRouter, 'createStream')
      changeRouteStub = sandbox.stub(Router.prototype, 'changeRoute')
      wrapper = mount(
        <Router store={store}>
          <Route path={baseRoute.path} name={baseRoute.name} validate={baseRoute.validate} />
          <Route path={homeRoute.path} name={homeRoute.name} validate={homeRoute.validate} />
        </Router>
      )
      router = wrapper.find('Router').instance()
      
    })
    it('should dispose slex-router', function () {
      routeStreamDisposeStub = sandbox.spy(router.routeStreamSubscription, 'dispose')
      wrapper.unmount()
      expect(routeStreamDisposeStub.calledOnce).to.be.true
    })
  })
  describe('when mounting', function () {
    let store
    let wrapper
    let dispatchSpy
    let createStreamSpy
    let changeRouteStub
    const baseRoute = {
      path: '/',
      name: 'base',
      validate: () => {}
    }
    const homeRoute = {
      path: '/home',
      name: 'home',
      validate: () => {}
    }
    beforeEach(function () {
      store =
        slexStore.createStore(
          slexStore.createDispatch({
            reducer: slexStore.createReducer({
              route: reduceRoute
            })
          })
        )
      dispatchSpy = sandbox.spy(store, 'dispatch')
      createStreamSpy = sandbox.spy(slexRouter, 'createStream')
      changeRouteStub = sandbox.stub(Router.prototype, 'changeRoute')
      wrapper = mount(
        <Router store={store}>
          <Route path={baseRoute.path} name={baseRoute.name} validate={baseRoute.validate} />
          <Route path={homeRoute.path} name={homeRoute.name} validate={homeRoute.validate} />
        </Router>
      )
    })
    afterEach(function () {
      wrapper.unmount()
    })
    it('should subscribe to slex-router with registered routes', function () {
      expect(createStreamSpy.calledOnce).to.be.true
      expect(createStreamSpy.firstCall.args[0][baseRoute.path]).to.exist
      expect(createStreamSpy.firstCall.args[0][baseRoute.path].name).to.equal(baseRoute.name)
      expect(createStreamSpy.firstCall.args[0][baseRoute.path].path).to.equal(baseRoute.path)
      expect(createStreamSpy.firstCall.args[0][baseRoute.path].validate).to.equal(baseRoute.validate)
      expect(createStreamSpy.firstCall.args[0][homeRoute.path]).to.exist
      expect(createStreamSpy.firstCall.args[0][homeRoute.path].name).to.equal(homeRoute.name)
      expect(createStreamSpy.firstCall.args[0][homeRoute.path].path).to.equal(homeRoute.path)
      expect(createStreamSpy.firstCall.args[0][homeRoute.path].validate).to.equal(homeRoute.validate)
    })
    it('should changeRoute to set the initial route', function () {
      expect(changeRouteStub.callCount).to.equal(1)
    })
  })
  describe('when the route changes', function () {
    let store
    let wrapper
    let router
    let dispatchSpy
    let createStreamSpy
    let changeRouteStub
    const stubChangeRouteAction = {}
    const baseRoute = {
      path: '/',
      name: 'base',
      validate: () => {}
    }
    const homeRoute = {
      path: '/home',
      name: 'home',
      validate: () => {}
    }
    beforeEach(function () {
      store =
        slexStore.createStore(
          slexStore.createDispatch({
            reducer: slexStore.createReducer({
              route: reduceRoute
            })
          })
        )
      dispatchSpy = sandbox.spy(store, 'dispatch')
      createStreamSpy = sandbox.spy(slexRouter, 'createStream')
      changeRouteStub = sandbox.stub(Router.prototype, 'changeRoute')
      wrapper = mount(
        <Router store={store}>
          <Route path={baseRoute.path} name={baseRoute.name} validate={baseRoute.validate} />
          <Route path={homeRoute.path} name={homeRoute.name} validate={homeRoute.validate} />
        </Router>
      )
      router = wrapper.find('Router').instance()
    })
    afterEach(function () {
      wrapper.unmount()
    })
    it('should changeRoute', function () {
      slexRouter.push({ path: '/home' })
      const routeStream = router.routeStream
      return routeStream
        .skip(1)
        .first()
        .toPromise()
        .then(() => {
          expect(changeRouteStub.callCount).to.equal(2)
        })
    })
  })
  describe('when the routePattern matches a rendered Route', function () {
    let store
    let dispatchSpy
    let wrapper
    let router
    const routePattern = 'routePatternTest'
    const baseRoute = {
      path: 'routePatternTest',
      name: 'base',
      validate: () => true
    }
    const homeRoute = {
      path: '/home',
      name: 'home',
      validate: () => true
    }
    class BaseRoute extends Component {
      render () {
        return <div className="base-route" />
      }
    }
    class HomeRoute extends Component {
      render () {
        return <div className="home-route" />
      }
    }
    beforeEach(function () {
      store =
        slexStore.createStore(
          slexStore.createDispatch({
            reducer: slexStore.createReducer({
              route: reduceRoute
            })
          })
        )
      dispatchSpy = sandbox.spy(store, 'dispatch')
      wrapper = mount(
        <Router store={store}>
          <Route path={baseRoute.path} name={baseRoute.name} validate={baseRoute.validate}>
            <BaseRoute />
          </Route>
          <Route path={homeRoute.path} name={homeRoute.name} validate={homeRoute.validate}>
            <HomeRoute />
          </Route>
        </Router>
      )
      router = wrapper.find('Router').instance()
    })
    afterEach(function () {
      wrapper.unmount()
    })
    it('should render the route content', function () {
      const routeStream = router.routeStream
      return routeStream
        .first()
        .toPromise()
        .then(() => {
          expect(wrapper.html()).to.equal('<div class="home-route"></div>')
        })
    })
  })
 
})




  // describe('changeRouteMiddleware', function () {
  //   // let store
  //   // let wrapper
  //   // let dispatchSpy
  //   // let createStreamSpy
  //   // let changeRouteStub
  //   // const stubChangeRouteAction = {}
  //   // const baseRoute = {
  //   //   path: '/',
  //   //   name: 'base',
  //   //   validate: () => {}
  //   // }
  //   // const homeRoute = {
  //   //   path: '/home',
  //   //   name: 'home',
  //   //   validate: () => {}
  //   // }
  //   // beforeEach(function () {
  //   //   store =
  //   //     slexStore.createStore(
  //   //       slexStore.createDispatch({
  //   //         reducer: slexStore.createReducer({
  //   //           router
  //   //         })
  //   //       })
  //   //     )
  //   //   dispatchSpy = sandbox.spy(store, 'dispatch')
  //   //   createStreamSpy = sandbox.spy(slexRouter, 'createStream')
  //   //   changeRouteStub = sandbox.stub(routeActions, 'changeRoute').returns(stubChangeRouteAction)
  //   //   wrapper = mount(
  //   //     <Router store={store}>
  //   //       <Route path={baseRoute.path} name={baseRoute.name} validate={baseRoute.validate} />
  //   //       <Route path={homeRoute.path} name={homeRoute.name} validate={homeRoute.validate} />
  //   //     </Router>
  //   //   )
  //   // })
  //   // afterEach(function () {
  //   //   wrapper.unmount()
  //   // })
  //   // it('should dispatch changeRoute', function () {
  //   //   slexRouter.push({ path: '/home' })
  //   //   const router = wrapper.find('Router')
  //   //   const routeStream = router.instance().routeStream
  //   //   return routeStream
  //   //     .skip(1)
  //   //     .first()
  //   //     .toPromise()
  //   //     .then(() => {
  //   //       expect(dispatchSpy.callCount).to.equal(2)
  //   //       expect(changeRouteStub.callCount).to.equal(2)
  //   //       expect(dispatchSpy.secondCall.args[0]).to.equal(stubChangeRouteAction)
  //   //     })
  //   // })


  //   describe('given that the action is change route', function () {
  //     describe('when the current route is the same as the one given', function () {
  //       const validatorStub = sandbox.stub().returns(Promise.resolve(true))
  //       let state
  //       beforeEach(function () {
  //         state = {
  //           route: {
  //             routeState: {
  //               path: 'testRoutePath'
  //             }
  //           }
  //         }
  //       })
  //       it('should do nothing', function () {
  //         const action = actions.changeRoute({ routeName: 'testRouteName', routeState: { path: 'testRoutePath' } })
  //         const dispatchStub = sandbox.stub()
  //         const getStateStub = sandbox.stub().returns(state)
  //         const actionResult = routeMiddleware.changeRouteMiddleware(dispatchStub, getStateStub, action)
  //         expect(actionResult).to.equal(undefined)
  //         expect(dispatchStub.called).to.equal(false)
  //       })
  //     })
  //     describe('when the current route is different to the one given', function () {
  //       let state
  //       beforeEach(function () {
  //         state = {
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
  //         }
  //       })
  //       it('should dispatch a routeLoading action', function () {
  //         const validatorStub = sandbox.stub().returns(Promise.resolve(true))
  //         const routeLoadingStubAction = {}
  //         const action = actions.changeRoute({ validate: validatorStub, routeName: 'testRouteName', routeState: { path: 'newPath' } })
  //         const dispatchStub = sandbox.stub()
  //         const getStateStub = sandbox.stub().returns(state)
  //         const routeLoadingStub = sandbox.stub(actions, 'routeLoading').returns(routeLoadingStubAction)
  //         routeMiddleware.changeRouteMiddleware(dispatchStub, getStateStub, action)
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
  //               routeMiddleware.changeRouteMiddleware(dispatchStub, getStateStub, action)
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
  //               routeMiddleware.changeRouteMiddleware(dispatchStub, getStateStub, action)
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
  //             routeMiddleware.changeRouteMiddleware(dispatchStub, getStateStub, action)
  //             return validatorStub.firstCall.returnValue
  //               .then(() => {
  //                 expect(dispatchStub.callCount).to.equal(1)
  //                 expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
  //               })
  //           })
  //         })
  //       })
  
  //       describe('given that the async validation fails', function () {
  //         const validateError = new Error('testError')
  //         let validatorStub
  //         beforeEach(function () {
  //           validatorStub = sandbox.stub().returns(Promise.reject(validateError))
  //         })
  //         describe('and the route is still pending', function () {
  //           it('should dispatch a pendingRouteError', function () {
  //             const routeLoadingStubAction = {}
  //             const pendingRouteErrorStubAction = {}
  //             const action = actions.changeRoute({ validate: validatorStub, ...state.route.pendingRoute })
  //             const dispatchStub = sandbox.stub()
  //             const getStateStub = sandbox.stub().returns(state)
  //             sandbox.stub(actions, 'routeLoading').returns(routeLoadingStubAction)
  //             const pendingRouteErrorStub = sandbox.stub(actions, 'pendingRouteError').returns(pendingRouteErrorStubAction)
  //             routeMiddleware.changeRouteMiddleware(dispatchStub, getStateStub, action)
  //             return validatorStub.firstCall.returnValue
  //               .catch(error => error)
  //               .then(() => {
  //                 expect(validatorStub.callCount).to.equal(1)
  //                 expect(dispatchStub.callCount).to.equal(2)
  //                 expect(pendingRouteErrorStub.callCount).to.equal(1)
  //                 expect(pendingRouteErrorStub.firstCall.args[0].error).to.equal(validateError)
  //                 expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
  //                 expect(dispatchStub.secondCall.args[0]).to.equal(pendingRouteErrorStubAction)
  //               })
  //           })
  //         })
  //         describe('and the route is no longer pending', function () {
  //           it('should do nothing', function () {
  //             const routeLoadingStubAction = {}
  //             const pendingRouteErrorStubAction = {}
  //             const action = actions.changeRoute({ validate: validatorStub, routeName: 'anotherRouteName', routeState: { path: 'anotherRoutePath' } })
  //             const dispatchStub = sandbox.stub()
  //             const getStateStub = sandbox.stub().returns(state)
  //             sandbox.stub(actions, 'routeLoading').returns(routeLoadingStubAction)
  //             const pendingRouteErrorStub = sandbox.stub(actions, 'pendingRouteError').returns(pendingRouteErrorStubAction)
  //             routeMiddleware.changeRouteMiddleware(dispatchStub, getStateStub, action)
  //             return validatorStub.firstCall.returnValue
  //               .catch(error => error)
  //               .then(() => {
  //                 expect(validatorStub.callCount).to.equal(1)
  //                 expect(dispatchStub.callCount).to.equal(1)
  //                 expect(pendingRouteErrorStub.callCount).to.equal(0)
  //                 expect(dispatchStub.firstCall.args[0]).to.equal(routeLoadingStubAction)
  //               })
  //           })
  //         })
  //       })
  //     })
  //   })
  // })
