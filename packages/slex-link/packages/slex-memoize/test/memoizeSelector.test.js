import { expect } from 'chai'
import sinon from 'sinon'
import memoizeSelector from '../src/memoizeSelector'

describe('memoizeSelector', function () {
  const sandbox = sinon.sandbox.create()
  beforeEach(function () {
    sandbox.restore()
  })
  afterEach(function () {
    sandbox.restore()
  })
  describe('when invoked with a single argument', function () {
    const state = {}
    const state2 = {}
    const paramsFunction = () => {}
    const paramsFunction2 = () => {}
    const paramsObject = {}
    const paramsObject2 = {}
    const paramsArray = []
    const paramsArray2 = []
    it('should return the same value when given the same argument and state', function () {
      const memoizedFn = memoizeSelector((state, { arg1 }) => ({}))
      const memoizedResultFunctionArg1 = memoizedFn(state, { arg1: paramsFunction })
      const memoizedResultFunctionArg2 = memoizedFn(state, { arg1: paramsFunction })
      const memoizedResultObjectArg1 = memoizedFn(state, { arg1: paramsObject })
      const memoizedResultObjectArg2 = memoizedFn(state, { arg1: paramsObject })
      const memoizedResultArrayArg1 = memoizedFn(state, { arg1: paramsArray })
      const memoizedResultArrayArg2 = memoizedFn(state, { arg1: paramsArray })
      expect(memoizedResultFunctionArg1).to.equal(memoizedResultFunctionArg2)
      expect(memoizedResultObjectArg1).to.equal(memoizedResultObjectArg2)
      expect(memoizedResultArrayArg1).to.equal(memoizedResultArrayArg2)
    })
    it('should return a different value when given a different argument', function () {
      const memoizedFn = memoizeSelector((state, { arg1 }) => ({}))
      const memoizedResultFunctionArg1 = memoizedFn(state, { arg1: paramsFunction })
      const memoizedResultFunctionArg2 = memoizedFn(state, { arg1: paramsFunction2 })
      const memoizedResultObjectArg1 = memoizedFn(state, { arg1: paramsObject })
      const memoizedResultObjectArg2 = memoizedFn(state, { arg1: paramsObject2 })
      const memoizedResultArrayArg1 = memoizedFn(state, { arg1: paramsArray })
      const memoizedResultArrayArg2 = memoizedFn(state, { arg1: paramsArray2 })
      expect(memoizedResultFunctionArg1).to.not.equal(memoizedResultFunctionArg2)
      expect(memoizedResultObjectArg1).to.not.equal(memoizedResultObjectArg2)
      expect(memoizedResultArrayArg1).to.not.equal(memoizedResultArrayArg2)
    })
    it('should return a different value when given a different state', function () {
      const memoizedFn = memoizeSelector((state, { arg1 }) => ({}))
      const memoizedResultFunctionArg1 = memoizedFn(state, { arg1: paramsFunction })
      const memoizedResultFunctionArg2 = memoizedFn(state2, { arg1: paramsFunction })
      const memoizedResultObjectArg1 = memoizedFn(state, { arg1: paramsObject })
      const memoizedResultObjectArg2 = memoizedFn(state2, { arg1: paramsObject })
      const memoizedResultArrayArg1 = memoizedFn(state, { arg1: paramsArray })
      const memoizedResultArrayArg2 = memoizedFn(state2, { arg1: paramsArray })
      expect(memoizedResultFunctionArg1).to.not.equal(memoizedResultFunctionArg2)
      expect(memoizedResultObjectArg1).to.not.equal(memoizedResultObjectArg2)
      expect(memoizedResultArrayArg1).to.not.equal(memoizedResultArrayArg2)
    })
  })
  describe('when invoked with multiple arguments', function () {
    const state = {}
    const state2 = {}
    const paramsFunction = () => {}
    const paramsFunction2 = () => {}
    const paramsObject = {}
    const paramsObject2 = {}
    const paramsArray = []
    const paramsArray2 = []
    it('should return the same value when given the same arguments and state', function () {
      const memoizedFn = memoizeSelector((state, { arg1, arg2, arg3 }) => ({}))
      const memoizedResultArg1 = memoizedFn(state, { arg1: paramsFunction, arg2: paramsObject, arg3: paramsArray })
      const memoizedResultArg2 = memoizedFn(state, { arg1: paramsFunction, arg2: paramsObject, arg3: paramsArray })
      expect(memoizedResultArg1).to.equal(memoizedResultArg2)
    })
    it('should return a different value when given different arguments', function () {
      const memoizedFn = memoizeSelector((state, { arg1, arg2, arg3 }) => ({}))
      const memoizedResultArg1 = memoizedFn(state, { arg1: paramsFunction, arg2: paramsObject, arg3: paramsArray })
      const memoizedResultArg2 = memoizedFn(state, { arg1: paramsFunction2, arg2: paramsObject, arg3: paramsArray })
      const memoizedResultArg3 = memoizedFn(state, { arg1: paramsArray, arg2: paramsObject, arg3: paramsFunction })
      expect(memoizedResultArg1).to.not.equal(memoizedResultArg2)
      expect(memoizedResultArg1).to.not.equal(memoizedResultArg3)
      expect(memoizedResultArg2).to.not.equal(memoizedResultArg3)
    })
    it('should return a different value when given a different state', function () {
      const memoizedFn = memoizeSelector((state, { arg1, arg2, arg3 }) => ({}))
      const memoizedResultArg1 = memoizedFn(state, { arg1: paramsFunction, arg2: paramsObject, arg3: paramsArray })
      const memoizedResultArg2 = memoizedFn(state2, { arg1: paramsFunction, arg2: paramsObject, arg3: paramsArray })
      expect(memoizedResultArg1).to.not.equal(memoizedResultArg2)
    })
  })
})
