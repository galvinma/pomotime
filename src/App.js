import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// pages
import Home from './Pages/Home/Home'
import NotFound from './Pages/NotFound/NotFound'

const _Home = () => (
  <div>
    <Home />
  </div>
)

const _NotFound = () => (
  <div>
    <NotFound />
  </div>
)

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={_Home}/>
            <Route component={_NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
