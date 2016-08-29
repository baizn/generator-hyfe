import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import configureStore from 'store/configureStore';

import Home from 'containers/home';
import DefaultIndex from 'containers/default';
import List from 'containers/list';
import Item from 'containers/item';

export default function(history) {
  return (
    <Router history={history}>
      <Route path="/" component={Home}>
        <Route path="list" component={List} />
        <Route path="item/:id" component={Item} />
        <IndexRoute component={DefaultIndex} />
      </Route>
    </Router>
  );
};
