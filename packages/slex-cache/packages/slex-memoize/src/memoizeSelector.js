import { memoize } from 'lodash'
import combineSelectorOptionsKeys from './combineSelectorOptionsKeys'
import MemoizeCache from './MemoizeCache'

/**
 * A resolver function for lodash memoize (https://lodash.com/docs/4.17.5#memoize) which allows for memoization of multiple arguments in an options object
 */
export const createSelectorResolver = () => {
  const cache = new MemoizeCache()
  return (state, options) => {
    let left = cache.get(state)
    if (!left) {
      left = cache.set(state)
    }
    const right = combineSelectorOptionsKeys({ options, cache })
    return left + '-' + right
  }
}

export const memoizeSelector = (fn) => memoize(fn, createSelectorResolver())

export default memoizeSelector
