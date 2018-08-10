import memoize from 'lodash/memoize'
import combineArgsKeys from './combineArgsKeys'
import MemoizeCache from './MemoizeCache'

/**
 * A resolver function for lodash memoize (https://lodash.com/docs/4.17.5#memoize) which allows for memoization of multiple arguments
 */
export const createArgsResolver = () => {
  const cache = new MemoizeCache()
  return (...args) => combineArgsKeys({ args, cache })
}

export const memoizeArgs = (fn) => memoize(fn, createArgsResolver())

export default memoizeArgs
