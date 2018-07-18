import { expect } from 'chai'
import sinon from 'sinon'
import reducers from '../src/bootstrap.reducers'

describe('bootstrap.reducers', function () {
  const sandbox = sinon.sandbox.create()
  beforeEach(function () {
    sandbox.restore()
  })
  afterEach(function () {
    sandbox.restore()
  })
})
