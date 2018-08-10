import { memoize } from 'lodash'

export const combineArgsKeys = ({ args, cache }) => {
  if (args.length === 1) {
    return args[0]
  } else {
    let key = ''
    for (const arg of args) {
      let val = cache.get(arg)
      if (!val) {
        val = cache.set(arg)
      }
      key = key + '-' + val
    }
    return key
  }
}

export default combineArgsKeys
