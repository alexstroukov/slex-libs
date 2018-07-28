import selectors from './bootstrap.selectors'

const createDeferredRenderApp = (renderApp) => (store) => {
  const unsubscribe = store.subscribe((state) => {
    if (state && selectors.getReady(state)) {
      unsubscribe()
      renderApp(store)
    }
  })
}

export default createDeferredRenderApp
