import React, { Component } from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import ConnectedRouter, { Router } from '../src/Router'
import Route from '../src/Route'
import router from '../src'
import routeActions from '../src/route.actions'
import * as routeStatuses from '../src/route.statuses'
import createStore from 'slex-store'
import slexRouter from 'slex-router'

describe('Router', function () {
  const sandbox = sinon.sandbox.create()

  beforeEach(function () {
    sandbox.restore()
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('when mounting', function () {
    let store
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
      store = createStore({
        reducers: {
          router
        }
      })
      dispatchSpy = sandbox.spy(store, 'dispatch')
      createStreamSpy = sandbox.spy(slexRouter, 'createStream')
      changeRouteStub = sandbox.stub(routeActions, 'changeRoute').returns(stubChangeRouteAction)
      mount(
        <ConnectedRouter store={store}>
          <Route path={baseRoute.path} name={baseRoute.name} validate={baseRoute.validate} />
          <Route path={homeRoute.path} name={homeRoute.name} validate={homeRoute.validate} />
        </ConnectedRouter>
      )
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
    it('should dispatch changeRoute to set the initial router', function () {
      expect(dispatchSpy.callCount).to.equal(1)
      expect(changeRouteStub.callCount).to.equal(1)
      expect(dispatchSpy.firstCall.args[0]).to.equal(stubChangeRouteAction)
    })
    // it('should dispatch changeRoute when route changes', function () {
    //   expect(createStreamSpy.calledOnce).to.be.true
    //   expect(createStreamSpy.firstCall.args[0][baseRoute.path]).to.exist
    //   expect(createStreamSpy.firstCall.args[0][baseRoute.path].name).to.equal(baseRoute.name)
    //   expect(createStreamSpy.firstCall.args[0][baseRoute.path].path).to.equal(baseRoute.path)
    //   expect(createStreamSpy.firstCall.args[0][baseRoute.path].validate).to.equal(baseRoute.validate)
    //   expect(createStreamSpy.firstCall.args[0][homeRoute.path]).to.exist
    //   expect(createStreamSpy.firstCall.args[0][homeRoute.path].name).to.equal(homeRoute.name)
    //   expect(createStreamSpy.firstCall.args[0][homeRoute.path].path).to.equal(homeRoute.path)
    //   expect(createStreamSpy.firstCall.args[0][homeRoute.path].validate).to.equal(homeRoute.validate)
    // })
  })

  describe('when the routePattern matches a rendered Route', function () {
    let store
    let dispatchSpy
    let changeRouteStub
    let wrapper
    const routePattern = 'routePatternTest'
    const baseRoute = {
      path: 'routePatternTest',
      name: 'base',
      validate: () => {}
    }
    const homeRoute = {
      path: '/home',
      name: 'home',
      validate: () => {}
    }
    class BaseRoute extends Component {
      render () {
        return null
      }
    }
    class HomeRoute extends Component {
      render () {
        return null
      }
    }

    beforeEach(function () {
      store = createStore({
        reducers: {
          router
        }
      })
      dispatchSpy = sandbox.spy(store, 'dispatch')
      changeRouteStub = sandbox.stub()
      sandbox.stub(Router.prototype, 'componentDidMount')
      wrapper = mount(
        <Router changeRoute={changeRouteStub} routePattern={routePattern}>
          <Route path={baseRoute.path} name={baseRoute.name} validate={baseRoute.validate}>
            <BaseRoute />
          </Route>
          <Route path={homeRoute.path} name={homeRoute.name} validate={homeRoute.validate}>
            <HomeRoute />
          </Route>
        </Router>
      )
    })
    it('should render the route content', function () {
      const baseRoute = wrapper.find('BaseRoute')
      const homeRoute = wrapper.find('HomeRoute')
      expect(baseRoute).to.have.length(1)
      expect(homeRoute).to.have.length(0)
    })
  })
})
