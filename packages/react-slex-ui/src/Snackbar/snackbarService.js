class SnackbarService {
  constructor () {
    this._createDeferredSnackbar = this._createDeferredSnackbar.bind(this)
    this._snackbar = this._createDeferredSnackbar()
  }
  connect = ({ open, close }) => {
    if (!this.connected) {
      this._snackbar.resolve({ open, close })
      this.connected = true
    } else {
      throw new Error('Snackbar connected called when it is already connected. You can only have one Snackbar active.')
    }
  }
  disconnect = () => {
    this._snackbar = this._createDeferredSnackbar()
    this.connected = false
  }
  close = () => {
    this._snackbar.promise.then(({ close }) => {
      close()
    })
  }
  open = ({ error }) => {
    this._snackbar.promise.then(({ open }) => {
      open({ error })
    })
  }
  _createDeferredSnackbar () {
    let pResolve
    const promise = new Promise((resolve, reject) => {
      pResolve = resolve
    })
    return {
      resolve: pResolve,
      promise: promise
    }
  }
}

export default new SnackbarService()
