import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WikiEdit from '../components/WikiEdit';
import WikiShow from '../components/WikiShow';

const WikiApp = () => (
  <Router>
    <div>
      <Route path='/wiki/:name' component={WikiShow} />
      <Route path='/edit/:name' component={WikiEdit} />
    </div>
  </Router>
);

ReactDOM.render(
  <WikiApp />,
  document.getElementById('root'),
)