import { expect } from 'chai'
import sinon from 'sinon'
import actions from '../src/bootstrap.actions'
import * as actionTypes from '../src/bootstrap.actionTypes'

describe('bootstrap.actions', function () {
  const sandbox = sinon.sandbox.create()
  beforeEach(function () {
    sandbox.restore()
  })
  afterEach(function () {
    sandbox.restore()
  })
  describe('bootstrapSuccess', function () {
    it('should return action with type BOOTSTRAP_SUCCESS', function () {
      const action = actions.bootstrapSuccess()
      expect(action.type).to.equal(actionTypes.BOOTSTRAP_SUCCESS)
    })
  })
  describe('bootstrapFail', function () {
    it('should return action with type BOOTSTRAP_SUCCESS', function () {
      const action = actions.bootstrapFail()
      expect(action.type).to.equal(actionTypes.BOOTSTRAP_FAIL)
    })
  })
})
