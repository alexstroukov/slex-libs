import { expect } from 'chai'
import sinon from 'sinon'
import memoizeArgs from '../src/memoizeArgs'

describe('memoizeArgs', function () {
  const sandbox = sinon.sandbox.create()
  beforeEach(function () {
    sandbox.restore()
  })
  afterEach(function () {
    sandbox.restore()
  })
  describe('when invoked with a single argument', function () {
    const paramsFunction = () => {}
    const paramsFunction2 = () => {}
    const paramsObject = {}
    const paramsObject2 = {}
    const paramsArray = []
    const paramsArray2 = []
    it('should return the same value when given the same argument', function () {
      const memoizedFn = memoizeArgs((arg1) => ({}))
      const memoizedResultFunctionArg1 = memoizedFn(paramsFunction)
      const memoizedResultFunctionArg2 = memoizedFn(paramsFunction)
      const memoizedResultObjectArg1 = memoizedFn(paramsObject)
      const memoizedResultObjectArg2 = memoizedFn(paramsObject)
      const memoizedResultArrayArg1 = memoizedFn(paramsArray)
      const memoizedResultArrayArg2 = memoizedFn(paramsArray)
      expect(memoizedResultFunctionArg1).to.equal(memoizedResultFunctionArg2)
      expect(memoizedResultObjectArg1).to.equal(memoizedResultObjectArg2)
      expect(memoizedResultArrayArg1).to.equal(memoizedResultArrayArg2)
    })
    it('should return a different value when given a different argument', function () {
      const memoizedFn = memoizeArgs((arg1) => ({}))
      const memoizedResultFunctionArg1 = memoizedFn(paramsFunction)
      const memoizedResultFunctionArg2 = memoizedFn(paramsFunction2)
      const memoizedResultObjectArg1 = memoizedFn(paramsObject)
      const memoizedResultObjectArg2 = memoizedFn(paramsObject2)
      const memoizedResultArrayArg1 = memoizedFn(paramsArray)
      const memoizedResultArrayArg2 = memoizedFn(paramsArray2)
      expect(memoizedResultFunctionArg1).to.not.equal(memoizedResultFunctionArg2)
      expect(memoizedResultObjectArg1).to.not.equal(memoizedResultObjectArg2)
      expect(memoizedResultArrayArg1).to.not.equal(memoizedResultArrayArg2)
    })
  })
  describe('when invoked with multiple arguments', function () {
    const paramsFunction = () => {}
    const paramsFunction2 = () => {}
    const paramsObject = {}
    const paramsObject2 = {}
    const paramsArray = []
    const paramsArray2 = []
    it('should return the same value when given the same arguments', function () {
      const memoizedFn = memoizeArgs((arg1, arg2, arg3) => ({}))
      const memoizedResultArg1 = memoizedFn(paramsFunction, paramsObject, paramsArray)
      const memoizedResultArg2 = memoizedFn(paramsFunction, paramsObject, paramsArray)
      expect(memoizedResultArg1).to.equal(memoizedResultArg2)
    })
    it('should return a different value when given different arguments', function () {
      const memoizedFn = memoizeArgs((arg1, arg2, arg3) => ({}))
      const memoizedResultArg1 = memoizedFn(paramsFunction, paramsObject, paramsArray)
      const memoizedResultArg2 = memoizedFn(paramsFunction2, paramsObject, paramsArray)
      const memoizedResultArg3 = memoizedFn(paramsArray, paramsObject, paramsFunction)
      expect(memoizedResultArg1).to.not.equal(memoizedResultArg2)
      expect(memoizedResultArg1).to.not.equal(memoizedResultArg3)
      expect(memoizedResultArg2).to.not.equal(memoizedResultArg3)
    })
  })

})
