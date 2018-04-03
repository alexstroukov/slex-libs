import { uniqueId, isArray, isObject, isFunction } from 'lodash'

class MemoizeCache {
  _map = new Map()
  _weakMap = new Map()
  get = (key) => {
    return this._weakMap.get(key) || this._map.get(key)
  }
  set = (key) => {
    const newVal = uniqueId()
    if (isArray(key) || isObject(key) || isFunction(key)) {
      this._weakMap.set(key, newVal)
    } else {
      this._map.set(key, newVal)
    }
    return newVal
  }
}

export default MemoizeCache
