import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Landing from './pages/landing';
import Listing from './pages/listing';
import Login from './pages/login';
import Register from './pages/register';
import Integration from './pages/integration';
import Profile from './pages/profile';
import Utils from './shared/utils';

const { Firebase } = Utils;

interface AppProps {
  language: string,
  supportedLanguages: any
}

//comment
function App(props: AppProps) {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path='/profile' component={Profile} />
          <Route exact path='/' render={() => (localStorage.getItem("userID") ? (<Redirect to="/listings" />) : (<Landing />))} />
          <Route path='/login' render={() => (localStorage.getItem("userID") ? (<Redirect to="/listings" />) : (<Login />))} />
          <Route path='/listings' render={() => (localStorage.getItem("userID") ? (<Listing />) : (<Redirect to="/login" />))} />
          <Route path='/register' render={() => (localStorage.getItem("userID") ? (<Redirect to="/listings" />) : (<Register />))} />
          <Route path='/integrations' render={() => (localStorage.getItem("userID") ? (<Integration />) : (<Redirect to="/login" />))} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
