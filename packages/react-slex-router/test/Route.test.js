import React, { Component } from 'react'
import { mount, configure } from 'enzyme'
import ReactSixteenAdapter from 'enzyme-adapter-react-16'
import { expect } from 'chai'
import sinon from 'sinon'
import Route from '../src/Route'

// need adapter to work with react ^16
configure({ adapter: new ReactSixteenAdapter() })

describe('Route', function () {
  const sandbox = sinon.sandbox.create()

  beforeEach(function () {
    sandbox.restore()
  })

  afterEach(function () {
    sandbox.restore()
  })

  class MyRoute extends Component {
    render () {
      return null
    }
  }

  it('should be able to render content as child element', function () {
    const wrapper = mount(
      <Route path={'path'} name={'name'} validate={() => {}}>
        <MyRoute />
      </Route>
    )
    const myRoute = wrapper.find('MyRoute')
    expect(myRoute).to.have.length(1)
  })
  it('should be able to render content as component prop', function () {
    const wrapper = mount(
      <Route path={'path'} name={'name'} validate={() => {}} component={MyRoute} />
    )
    const myRoute = wrapper.find('MyRoute')
    expect(myRoute).to.have.length(1)
  })
})
