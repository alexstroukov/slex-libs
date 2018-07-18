import { expect } from 'chai'
import sinon from 'sinon'
import actions from '../src/bootstrap.actions'

describe('bootstrap.actions', function () {
  const sandbox = sinon.sandbox.create()
  beforeEach(function () {
    sandbox.restore()
  })
  afterEach(function () {
    sandbox.restore()
  })
})
