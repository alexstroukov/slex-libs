import reducers from './bootstrap.reducers'
import * as actionTypes from './bootstrap.actionTypes'
import initialState from './initialState'
import createDeferredRenderApp from './createDeferredRenderApp'
import createBootstrap from './createBootstrap'

export {
  createDeferredRenderApp,
  createBootstrap
}

export default function reduceBootstrap (state = initialState, action) {
  switch (action.type) {
    case actionTypes.BOOTSTRAP_SUCCESS:
      return reducers.bootstrapSuccess(state, action)
    case actionTypes.BOOTSTRAP_FAIL:
      return reducers.bootstrapSuccess(state, action)
    default:
      return state
  }
}
