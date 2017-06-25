describe('route.reducers', function () {
  describe('routeLoading', function () {
    it('should return a new object')
    it('should set the status to LOADING')
    it('should set the pendingRoute routeName to the routeName from the action')
    it('should set the pendingRoute routeState to the routeState from the action')
    it('should clear the error')

    describe('given that there is not pendingRoute and no current route', function () {
      it('should clear the previousRoute')
    })
    describe('given that there is already a pendingRoute on the state', function () {
      it('should set the previousRoute to the value of the pendingRoute')
    })
    describe('given that there is no pendingRoute but there is already a current route', function () {
      it('should set the previousRoute to be the current route')
    })
  })
  describe('pendingRouteReady', function () {
    it('should return a new object')
    it('should set the status to READY')
    it('should clear the error')
    it('should set the routeName to the pendingRoute routeName')
    it('should set the routeState to the pendingRoute routeState')
    it('should clear the pendingRoute')
  })
  describe('pendingRouteAccessDenied', function () {
    it('should return a new object')
    it('should set the status to READY')
    it('should clear the error')
  })
  describe('pendingRouteError', function () {
    it('should return a new object')
    it('should set the status to ERROR')
    it('should set the error to the error from the action')
  })
})
