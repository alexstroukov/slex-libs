import { memoize } from 'lodash'

export const combineSelectorOptionsKeys = ({ options, cache }) => {
  const optionKeys = Object.keys(options)
  if (optionKeys.length === 1) {
    const arg = options[optionKeys[0]]
    let val = cache.get(arg)
    if (!val) {
      val = cache.set(arg)
    }
    return val
  } else {
    let key = ''
    for (const optionKey of optionKeys) {
      const arg = options[optionKey]
      let val = cache.get(arg)
      if (!val) {
        val = cache.set(arg)
      }
      key = key + '-' + val
    }
    return key
  }
}

export default combineSelectorOptionsKeys
