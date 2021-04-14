import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Landing from './pages/landing';
import Listing from './pages/listing';
import Login from './pages/login';
import Register from './pages/register';
import Integration from './pages/integration';
import Utils from './shared/utils';
import ProductsPage from './pages/products';
import Dashboard from './pages/dashboard';
import { Helper } from './shared/libs/helper';

const { Firebase } = Utils;

interface AppProps {
  language: string,
  supportedLanguages: any
}


function App(props: AppProps) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={() => (Helper.getUserID() ? (<Redirect to="/listings" />) : (<Landing />))} />
        {/* <Route path='/profile' render={() => (Helper.getUserID() ? (<Redirect to="/listings" />) : (<Profile />))} /> */}
        <Route path='/products' render={() => (Helper.getUserID() ? (<ProductsPage />) : (<Redirect to="/login" />))} />
        <Route path='/dashboard' render={() => (Helper.getUserID() ? (<Dashboard />) : (<Redirect to="/login" />))} />
        <Route path='/login' render={() => (Helper.getUserID() ? (<Redirect to="/listings" />) : (<Login />))} />
        <Route path='/listings' render={() => (Helper.getUserID() ? (<Listing />) : (<Redirect to="/login" />))} />
        <Route path='/register' render={() => (Helper.getUserID() ? (<Redirect to="/listings" />) : (<Register />))} />
        <Route path='/integrations' render={() => (Helper.getUserID() ? (<Integration />) : (<Redirect to="/login" />))} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
