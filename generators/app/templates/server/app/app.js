import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'

import configureStore from 'store/configureStore'
import createRoutes from 'routes/index'
import { Provider } from 'react-redux'
import Immutable from 'immutable'
import _ from 'lodash'

let initialState = {}
if (window.__INITIAL_STATE__) {
  try {
    let plain = JSON.parse(unEncodeURI(__INITIAL_STATE__))
    console.log('initialState=' + plain)
    _.each(plain, (val, key)=> {
      initialState[key] = Immutable.fromJS(val)
    })
  } catch (e) {
  }
}

const store = configureStore(initialState)

ReactDOM.render((
  <Provider store={store}>
    { createRoutes(browserHistory) }
  </Provider>
), document.getElementById('root'))
