import * as actionTypes from './bootstrap.actionTypes'

class BootstrapActions {
  bootstrapSuccess = () => {
    const action = {
      type: actionTypes.BOOTSTRAP_SUCCESS
    }
    return action
  }
  bootstrapFail = () => {
    const action = {
      type: actionTypes.BOOTSTRAP_FAIL
    }
    return action
  }
}

export default new BootstrapActions()
