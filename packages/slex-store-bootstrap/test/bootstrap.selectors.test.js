import { expect } from 'chai'
import sinon from 'sinon'
import selectors from '../src/bootstrap.selectors'
import * as statuses from '../src/bootstrap.statuses'

describe('bootstrap.selectors', function () {
  const sandbox = sinon.sandbox.create()
  beforeEach(function () {
    sandbox.restore()
  })
  afterEach(function () {
    sandbox.restore()
  })
  describe('getReady', function () {
    it('should return true when status is READY', function () {
      const state = { bootstrap: { status: statuses.READY } }
      const result = selectors.getReady(state)
      expect(result).to.equal(true)
    })
  })
  describe('getError', function () {
    it('should return true when status is ERROR', function () {
      const state = { bootstrap: { status: statuses.ERROR } }
      const result = selectors.getError(state)
      expect(result).to.equal(true)
    })
  })
})
