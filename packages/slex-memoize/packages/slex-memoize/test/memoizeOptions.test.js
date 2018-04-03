import { expect } from 'chai'
import sinon from 'sinon'
import memoizeOptions from '../src/memoizeOptions'

describe('memoizeOptions', function () {
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
      const memoizedFn = memoizeOptions(({ arg1 }) => ({}))
      const memoizedResultFunctionArg1 = memoizedFn({ arg1: paramsFunction })
      const memoizedResultFunctionArg2 = memoizedFn({ arg1: paramsFunction })
      const memoizedResultObjectArg1 = memoizedFn({ arg1: paramsObject })
      const memoizedResultObjectArg2 = memoizedFn({ arg1: paramsObject })
      const memoizedResultArrayArg1 = memoizedFn({ arg1: paramsArray })
      const memoizedResultArrayArg2 = memoizedFn({ arg1: paramsArray })
      expect(memoizedResultFunctionArg1).to.equal(memoizedResultFunctionArg2)
      expect(memoizedResultObjectArg1).to.equal(memoizedResultObjectArg2)
      expect(memoizedResultArrayArg1).to.equal(memoizedResultArrayArg2)
    })
    it('should return a different value when given a different argument', function () {
      const memoizedFn = memoizeOptions(({ arg1 }) => ({}))
      const memoizedResultFunctionArg1 = memoizedFn({ arg1: paramsFunction })
      const memoizedResultFunctionArg2 = memoizedFn({ arg1: paramsFunction2 })
      const memoizedResultObjectArg1 = memoizedFn({ arg1: paramsObject })
      const memoizedResultObjectArg2 = memoizedFn({ arg1: paramsObject2 })
      const memoizedResultArrayArg1 = memoizedFn({ arg1: paramsArray })
      const memoizedResultArrayArg2 = memoizedFn({ arg1: paramsArray2 })
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
      const memoizedFn = memoizeOptions(({ arg1, arg2, arg3 }) => ({}))
      const memoizedResultArg1 = memoizedFn({ arg1: paramsFunction, arg2: paramsObject, arg3: paramsArray })
      const memoizedResultArg2 = memoizedFn({ arg1: paramsFunction, arg2: paramsObject, arg3: paramsArray })
      expect(memoizedResultArg1).to.equal(memoizedResultArg2)
    })
    it('should return a different value when given different arguments', function () {
      const memoizedFn = memoizeOptions(({ arg1, arg2, arg3 }) => ({}))
      const memoizedResultArg1 = memoizedFn({ arg1: paramsFunction, arg2: paramsObject, arg3: paramsArray })
      const memoizedResultArg2 = memoizedFn({ arg1: paramsFunction2, arg2: paramsObject, arg3: paramsArray })
      const memoizedResultArg3 = memoizedFn({ arg1: paramsArray, arg2: paramsObject, arg3: paramsFunction })
      expect(memoizedResultArg1).to.not.equal(memoizedResultArg2)
      expect(memoizedResultArg1).to.not.equal(memoizedResultArg3)
      expect(memoizedResultArg2).to.not.equal(memoizedResultArg3)
    })
  })

})
