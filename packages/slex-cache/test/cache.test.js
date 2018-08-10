import { expect } from 'chai'
import sinon from 'sinon'
import cache from '../src'

describe('cache', function () {
  const sandbox = sinon.sandbox.create()
  beforeEach(function () {
    sandbox.restore()
  })
  afterEach(function () {
    sandbox.restore()
  })
})
