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
    const params = { validate: 'testValidate', routeName: 'testRouteName', routeState: { path: 'testRoutePath' } }
    it('should create an object action', function () {
      const changeRouteAction = routeActions.changeRoute(params)
      expect(changeRouteAction !== null && typeof changeRouteAction === 'object').to.equal(true)
    })
    it('should include the given routeName in the returned object', function () {
      const changeRouteAction = routeActions.changeRoute(params)
      expect(changeRouteAction.routeName).to.equal(params.routeName)
    })
    it('should include the given routeState in the returned object', function () {
      const changeRouteAction = routeActions.changeRoute(params)
      expect(changeRouteAction.routeState).to.equal(params.routeState)
    })
    it('should include the given validate key in the returned object', function () {
      const changeRouteAction = routeActions.changeRoute(params)
      expect(changeRouteAction.validate).to.equal(params.validate)
    })
  })
})
