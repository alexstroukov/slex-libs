import { expect } from 'chai'
import sinon from 'sinon'
import reducers from '../src/bootstrap.reducers'
import * as statuses from '../src/bootstrap.statuses'

describe('bootstrap.reducers', function () {
  const sandbox = sinon.sandbox.create()
  beforeEach(function () {
    sandbox.restore()
  })
  afterEach(function () {
    sandbox.restore()
  })
  describe('bootstrapSuccess', function () {
    it('should return new state', function () {
      const state = {}
      const nextState = reducers.bootstrapSuccess()
      expect(nextState).to.not.equal(state)
    })
    it('should return state with status READY', function () {
      const state = {}
      const nextState = reducers.bootstrapSuccess()
      expect(nextState.status).to.equal(statuses.READY)
    })
  })
  describe('bootstrapFail', function () {
    it('should return new state', function () {
      const state = {}
      const nextState = reducers.bootstrapFail()
      expect(nextState).to.not.equal(state)
    })
    it('should return state with status ERROR', function () {
      const state = {}
      const nextState = reducers.bootstrapFail()
      expect(nextState.status).to.equal(statuses.ERROR)
    })
  })
})
