import once from 'lodash/once'

class Cache {
  _getDB = once(() => {
    return new Promise((resolve, reject) => {
      var openreq = indexedDB.open('cache-db', 3)
      openreq.onerror = () => {
        reject(openreq.error)
      }
      openreq.onupgradeneeded = () => {
        openreq.result.createObjectStore('cache')
      }
      openreq.onsuccess = () => {
        resolve(openreq.result)
      }
    })
  })
  _withStore = (type, executeQuery) => {
    return this._getDB()
      .then(db => {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction('cache', type)
          const query = executeQuery(transaction.objectStore('cache'))
          transaction.oncomplete = (event) => {
            resolve(query && query.result)
          }
          transaction.onerror = () => {
            reject(transaction.error)
          }
        })
      })
  }
  getItem = (key) => {
    return this._withStore('readonly', store => {
      return store.get(key)
    })
  }
  setItem = (key, value) => {
    return this._withStore('readwrite', (store) => {
      store.put(value, key)
    })
  }
  removeItem = (key) => {
    return this._withStore('readwrite', (store) => {
      store.delete(key)
    })
  }
}

export default new Cache()
