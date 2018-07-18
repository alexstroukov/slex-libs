import * as statuses from './bootstrap.statuses'

class BootstrapReducers {
  bootstrapSuccess = (state, action) => {
    return {
      status: statuses.READY
    }
  }
  bootstrapFail = (state, action) => {
    return {
      status: statuses.ERROR
    }
  }
}

export default new BootstrapReducers()
