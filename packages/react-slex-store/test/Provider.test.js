import React, { Component } from 'react'
import { expect } from 'chai'
import sinon from 'sinon'
import connect from '../src/connect'
import Provider from '../src/Provider'
import { mount, shallow, configure } from 'enzyme'
import ReactSixteenAdapter from 'enzyme-adapter-react-16'
import createStore from 'slex-store'

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

  describe('Provider', function () {
    it('should provide connect with dispatch', function () {
      const initialState = {
        testProp: 'testProp'
      }
      const store = createStore({
        reducers: {
          testStore: (state = initialState, action) => state
        }
      })
      const connectSpy = sandbox.spy((dispatch, getState, ownProps) => {
        return ownProps
      })
      const MyConnectedComponent = connect(connectSpy)(props => null)
      mount(
        <Provider store={store}>
          <MyConnectedComponent store={store} />
        </Provider>
      )
      expect(connectSpy.calledOnce).to.be.true
      expect(connectSpy.firstCall.args[0]).to.equal(store.dispatch)
    })
    it('should provide connect with getState', function () {
      const initialState = {
        testProp: 'testProp'
      }
      const store = createStore({
        reducers: {
          testStore: (state = initialState, action) => state
        }
      })
      const connectSpy = sandbox.spy((dispatch, getState, ownProps) => {
        return ownProps
      })
      const MyConnectedComponent = connect(connectSpy)(props => null)
      mount(
        <Provider store={store}>
          <MyConnectedComponent store={store} />
        </Provider>
      )

      expect(connectSpy.calledOnce).to.be.true
      expect(connectSpy.firstCall.args[1]).to.equal(store.getState)
    })
  })
})
