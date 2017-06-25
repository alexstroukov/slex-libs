import { expect } from 'chai'
import sinon from 'sinon'
import { connect } from '../src/reactSlexStore'

describe('reactSlexStore', function () {
  const sandbox = sinon.sandbox.create()
  beforeEach(function () {
    sandbox.restore()
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('connect', function () {
    it('should do something', function () {

    })
  })
})
