import { expect } from 'chai'
import sinon from 'sinon'
import createDeferredRenderApp from '../src/createDeferredRenderApp'

describe('createDeferredRenderApp', function () {
  const sandbox = sinon.sandbox.create()
  beforeEach(function () {
    sandbox.restore()
  })
  afterEach(function () {
    sandbox.restore()
  })
})
