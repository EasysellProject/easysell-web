import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './pages/landing';
import Listing from './pages/listing';
import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile';
import Utils from './shared/utils';

const { Firebase } = Utils;

interface AppProps {
  language: string,
  supportedLanguages: any
}


function App(props: AppProps) {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/login' component={Login} />
          <Route path='/listings' component={Listing} />
          <Route path='/register' component={Register} />
          <Route path='/profile' component={Profile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
