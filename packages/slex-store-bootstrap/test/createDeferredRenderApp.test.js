import { expect } from 'chai'
import sinon from 'sinon'
import createDeferredRenderApp from '../src/createDeferredRenderApp'
import * as statuses from '../src/bootstrap.statuses'
import { createMockStore } from './utils'

describe('createDeferredRenderApp', function () {
  const sandbox = sinon.sandbox.create()
  beforeEach(function () {
    sandbox.restore()
  })
  afterEach(function () {
    sandbox.restore()
  })
  it('should return a function which renders app on store subscribe when bootstrap state becomes ready', function () {
    const store = createMockStore(sandbox)
    const renderAppStub = sandbox.stub()
    const deferredRenderApp = createDeferredRenderApp(renderAppStub)
    deferredRenderApp(store)
    let state = {
      bootstrap: {
        status: statuses.INITIAL
      }
    }
    store.triggerSubscribe(state)
    expect(renderAppStub.callCount).to.equal(0)
    state = {
      bootstrap: {
        status: statuses.ERROR
      }
    }
    store.triggerSubscribe(state)
    expect(renderAppStub.callCount).to.equal(0)
    state = {
      bootstrap: {
        status: statuses.READY
      }
    }
    store.triggerSubscribe(state)
    expect(renderAppStub.callCount).to.equal(1)
    expect(store.unsubscribe.calledOnce).to.equal(true)
    expect(renderAppStub.firstCall.args[0]).to.equal(store)
  })
})
