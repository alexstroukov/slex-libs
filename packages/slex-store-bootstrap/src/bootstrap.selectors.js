import * as statuses from './bootstrap.statuses'

class BootstrapSlectors {
  getReady = (state) => {
    const {
      bootstrap: {
        status
      } = {}
    } = state
    return status === statuses.READY
  }
  getError = (state) => {
    const {
      bootstrap: {
        status
      } = {}
    } = state
    return status === statuses.ERROR
  }
}

export default new BootstrapSlectors()
