import actions from './bootstrap.actions'

const tryCompleteBootstrap = ({ dispatch, pendingBootstraps, executingBootstraps }) => {
  if (executingBootstraps.length === 0) {
    if (pendingBootstraps.length === 0) {
      dispatch(actions.bootstrapSuccess())
    } else {
      dispatch(actions.bootstrapFail())
    }
  }
}
const applyBootstrap = ({ pendingBootstraps, executingBootstraps, bootstrapName, bootstrap, dispatch, getState }) => {
  executingBootstraps.push(bootstrapName)
  return bootstrap({ dispatch, getState })
    .then(() => {
      pendingBootstraps.splice(pendingBootstraps.indexOf(bootstrapName), 1)
      executingBootstraps.splice(executingBootstraps.indexOf(bootstrapName), 1)
      tryCompleteBootstrap({ dispatch, pendingBootstraps, executingBootstraps })
    })
    .catch((error) => {
      executingBootstraps.splice(executingBootstraps.indexOf(bootstrapName), 1)
      tryCompleteBootstrap({ dispatch, pendingBootstraps, executingBootstraps })
      throw error
    })
}
const applyBootstraps = ({ pendingBootstraps, executingBootstraps, bootstraps, dispatch, getState }) => {
  for (const bootstrapName in bootstraps) {
    pendingBootstraps.push(bootstrapName)
    const bootstrap = bootstraps[bootstrapName]
    applyBootstrap({ pendingBootstraps, executingBootstraps, bootstrapName, bootstrap, dispatch, getState })
  }
}
const createBootstrap = (bootstraps) => ({ dispatch, getState }) => {
  const pendingBootstraps = []
  const executingBootstraps = []
  applyBootstraps({ pendingBootstraps, executingBootstraps, bootstraps, dispatch, getState })
  return function retry () {
    applyBootstraps({ pendingBootstraps, executingBootstraps, bootstraps: pendingBootstraps || [], dispatch, getState })
  }
}

export default createBootstrap
