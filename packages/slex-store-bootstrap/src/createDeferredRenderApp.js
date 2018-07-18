import selectors from './bootstrap.selectors'

const createDeferredRenderApp = (renderApp) => (store) => {
  const unsubscribe = store.subscribe((state) => {
    if (selectors.getReady(state)) {
      renderApp(store)
      unsubscribe()
    }
  })
}

export default createDeferredRenderApp
