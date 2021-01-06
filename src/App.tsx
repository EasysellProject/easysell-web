import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './pages/landing';
import Login from './pages/login';
import Register from './pages/register';
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
        {
          Firebase.auth().currentUser ? (
            <div>
              <img src='./assets/images/logo_white.png' />
            </div>
          ) : (
              <Switch>
                <Route exact path='/' component={Landing} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
              </Switch>
            )

        }
      </BrowserRouter>
    </div>
  );
}

export default App;
