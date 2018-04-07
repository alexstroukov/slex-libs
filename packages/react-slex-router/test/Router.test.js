import React, { Component } from 'react'
import { mount, configure } from 'enzyme'
import ReactSixteenAdapter from 'enzyme-adapter-react-16'
import { expect } from 'chai'
import sinon from 'sinon'
import Router from '../src/Router'
import Route from '../src/Route'
import reduceRoute from '../src'
import routeActions from '../src/route.actions'
import routeChanger from '../src/routeChanger'
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
      changeRouteStub = sandbox.stub(routeChanger, 'changeRoute')
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
      changeRouteStub = sandbox.stub(routeChanger, 'changeRoute')
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
      changeRouteStub = sandbox.stub(routeChanger, 'changeRoute')
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
