function defer () {
  let resolve, reject, isComplete = false
  let promise = new Promise((promiseResolve, promiseReject) => {
    resolve = (...args) => {
      isComplete = true
      promiseResolve(...args)
    }
    reject = (...args) => {
      isComplete = true
      promiseReject(...args)
    }
  })
  return {
    isComplete,
    resolve,
    reject,
    promise
  }
}
function createMockStore (sandbox) {
  class MockStore {
    triggerSubscribe = (state) => {
      this.fn && this.fn(state)
    }
    subscribe = (fn) => {
      this.fn = fn
      this.unsubscribe = sandbox.stub()
      return this.unsubscribe
    }
  }
  return new MockStore()
}
export {
  createMockStore,
  defer
}