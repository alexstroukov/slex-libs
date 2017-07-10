import React, { Component } from 'react'
import { expect } from 'chai'
import sinon from 'sinon'
import { connect, Provider } from '../src/reactSlexStore'
import { shallow } from 'enzyme'
import createStore from 'slex-store'

describe('reactSlexStore', function () {
  const sandbox = sinon.sandbox.create()
  beforeEach(function () {
    sandbox.restore()
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('connect', function () {
    it('should be provided dispatch', function () {
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
      const wrapper = shallow(
        <Provider store={store}>
          <MyConnectedComponent />
        </Provider>
      )
      const shallowRenderedMyConnectedComponent = wrapper.find(MyConnectedComponent).shallow()

      expect(connectSpy.calledOnce).to.be.true
      expect(connectSpy.firstCall.args[0]).to.equal(store.dispatch)
    })
    it('should be provided getState', function () {
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
      const wrapper = shallow(
        <Provider store={store}>
          <MyConnectedComponent />
        </Provider>
      )
      const shallowRenderedMyConnectedComponent = wrapper.find(MyConnectedComponent).shallow()

      expect(connectSpy.calledOnce).to.be.true
      expect(connectSpy.firstCall.args[1]).to.equal(store.getState)
    })
    it('should be provided ownProps', function () {
      const ownProp = 'ownProp'
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
      const wrapper = shallow(
        <Provider store={store}>
          <MyConnectedComponent ownProp={ownProp} />
        </Provider>
      )
      const shallowRenderedMyConnectedComponent = wrapper.find(MyConnectedComponent).shallow()

      expect(connectSpy.calledOnce).to.be.true
      expect(connectSpy.firstCall.args[2].ownProp).to.equal(ownProp)
    })

    it('should be able to provide wrapped component with additional props from store', function () {
      const ownProp = 'ownProp'
      const initialState = {
        testProp: 'testProp'
      }
      const store = createStore({
        reducers: {
          testStore: (state = initialState, action) => state
        }
      })
      class MyComponent extends Component {
        render () {
          return null
        }
      }
      const MyConnectedComponent = connect((dispatch, getState, ownProps) => {
        const { testStore: { testProp } } = getState()
        return {
          ...ownProps,
          testProp
        }
      })(MyComponent)
      const wrapper = shallow(
        <Provider store={store}>
          <MyConnectedComponent ownProp={ownProp} />
        </Provider>
      )

      const shallowRenderedMyComponent = wrapper.find(MyConnectedComponent).shallow().find(MyComponent).shallow()
      const shallowRenderedMyComponentProps = shallowRenderedMyComponent.unrendered.props
      expect(shallowRenderedMyComponentProps.testProp).to.equal(initialState.testProp)
      expect(shallowRenderedMyComponentProps.ownProp).to.equal(ownProp)
    })
  })
})
