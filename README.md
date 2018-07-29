# Slex Libs

`slex-libs` is a collection of javascript modules to aid in creating javascript/React SPAs.

- [`slex-store`](https://github.com/alexstroukov/slex-libs/tree/master/packages/slex-store) is a uni directional state container inspired by the ideas of flux and redux

- [`slex-router`](https://github.com/alexstroukov/slex-libs/tree/master/packages/slex-router) is a simple client side router.

- [`slex-store-bootstrap`](https://github.com/alexstroukov/slex-libs/tree/master/packages/slex-store-bootstrap) is a set of slex-store bindings to delay rendering app until after bootstrapping is complete.

- [`slex-store-worker`](https://github.com/alexstroukov/slex-libs/tree/master/packages/slex-store-worker) is a set of wrappers which allow developers to extract their store into a web worker. It works by having two parallel stores which synchronise every time the state changes.

- [`react-slex-store`](https://github.com/alexstroukov/slex-libs/tree/master/packages/react-slex-store) is a connector for slex-store similar to what react-redux is to redux. It allows components to connect to the slex-store to gain access to store data and dispatch.

- [`react-slex-router`](https://github.com/alexstroukov/slex-libs/tree/master/packages/react-slex-router) is a component driven router implementation for react. It is connected to slex-store via react-slex-store and its state is kept in its own store similar to redux-router combined with react-router.

- [`react-slex-ui`](https://github.com/alexstroukov/slex-libs/tree/master/packages/react-slex-ui) is a react component library based on material-ui.
