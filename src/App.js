import React from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shoppage/shoppage';

function App() {
  return (
    <div>
	    <Switch>
	      <Route exact path='/' component={HomePage} />
	      <Route exact path='/shop' component={ShopPage} />
	    </Switch>
    </div>
  );
}

export default App;
