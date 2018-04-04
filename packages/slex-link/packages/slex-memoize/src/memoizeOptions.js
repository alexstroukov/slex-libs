import memoize from 'lodash/memoize'
import combineOptionsKeys from './combineOptionsKeys'
import MemoizeCache from './MemoizeCache'

/**
 * A resolver function for lodash memoize (https://lodash.com/docs/4.17.5#memoize) which allows for memoization of multiple arguments in an options object
 */
export const createOptionsResolver = () => {
  const cache = new MemoizeCache()
  return (options) => combineOptionsKeys({ options, cache })
}

export const memoizeOptions = (fn) => memoize(fn, createOptionsResolver())

export default memoizeOptions
