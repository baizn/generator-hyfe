import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'

import configureStore from 'src/store/configureStore'
import createRoutes from './routes'
import { Provider } from 'react-redux'
import Immutable from 'immutable'
import _ from 'lodash'

let initialState = {}
console.log('initialState1=' + JSON.stringify(window.__INITIAL_STATE__))
if (window.__INITIAL_STATE__) {
  try {
    let plain = JSON.parse(JSON.stringify(window.__INITIAL_STATE__))
    console.log('initialState=' + plain)
    _.each(plain, (val, key)=> {
      initialState[key] = Immutable.fromJS(val)
    })
  } catch (e) {
    console.log('JSON.parse faild')
  }
}

const store = configureStore(initialState)

ReactDOM.render((
  <Provider store={store}>
    { createRoutes(browserHistory) }
  </Provider>
), document.getElementById('container'))
