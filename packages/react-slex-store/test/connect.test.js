import React, { Component } from 'react'
import { expect } from 'chai'
import sinon from 'sinon'
import connect from '../src/connect'
import { mount, configure } from 'enzyme'
import ReactSixteenAdapter from 'enzyme-adapter-react-16'
import slexStore from 'slex-store'

// need adapter to work with react ^16
configure({ adapter: new ReactSixteenAdapter() })

describe('reactSlexStore', function () {
  const sandbox = sinon.sandbox.create()
  beforeEach(function () {
    sandbox.restore()
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('connect', function () {
    it('should connect component with dispatch functionality', function () {
      const initialState = {
        testProp: 'testProp'
      }
      const store =
        slexStore.createStore(
          slexStore.createDispatch({
            reducer: slexStore.createReducer({
              testStore: (state = initialState, action) => state
            })
          })
        )
      const connectSpy = sandbox.spy((dispatch, getState, ownProps) => {
        return {
          ...ownProps,
          dispatch
        }
      })
      const MyComponent = sandbox.spy(props => null)
      const MyConnectedComponent = connect(connectSpy)(MyComponent)
      mount(<MyConnectedComponent store={store} />)
      expect(connectSpy.calledOnce).to.be.true
      expect(connectSpy.firstCall.args[0]).to.equal(store.dispatch)
      expect(MyComponent.calledOnce).to.be.true
      expect(MyComponent.firstCall.args[0].dispatch).to.equal(store.dispatch)
    })
    it('should connect component with getState functionality', function () {
      const initialState = {
        testProp: 'testProp'
      }
      const store =
        slexStore.createStore(
          slexStore.createDispatch({
            reducer: slexStore.createReducer({
              testStore: (state = initialState, action) => state
            })
          })
        )
      const connectSpy = sandbox.spy((dispatch, getState, ownProps) => {
        return {
          ...ownProps,
          getState
        }
      })
      const MyComponent = sandbox.spy(props => null)
      const MyConnectedComponent = connect(connectSpy)(MyComponent)
      mount(<MyConnectedComponent store={store} />)
      expect(connectSpy.calledOnce).to.be.true
      expect(connectSpy.firstCall.args[1]).to.equal(store.getState)
      expect(MyComponent.calledOnce).to.be.true
      expect(MyComponent.firstCall.args[0].getState).to.equal(store.getState)
    })
    it('should connect component with its own props', function () {
      const ownProp = 'ownProp'
      const initialState = {
        testProp: 'testProp'
      }
      const store =
        slexStore.createStore(
          slexStore.createDispatch({
            reducer: slexStore.createReducer({
              testStore: (state = initialState, action) => state
            })
          })
        )
      const connectSpy = sandbox.spy((dispatch, getState, ownProps) => {
        return ownProps
      })
      const MyComponent = sandbox.spy(props => null)
      const MyConnectedComponent = connect(connectSpy)(MyComponent)
      mount(<MyConnectedComponent ownProp={ownProp} store={store} />)
      expect(connectSpy.calledOnce).to.be.true
      expect(connectSpy.firstCall.args[2].ownProp).to.equal(ownProp)
      expect(MyComponent.calledOnce).to.be.true
      expect(MyComponent.firstCall.args[0].ownProp).to.equal(ownProp)
    })
  })
})
