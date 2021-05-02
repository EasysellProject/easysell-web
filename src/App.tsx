import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Landing from './pages/landing';
import Listing from './pages/listing';
import Login from './pages/login';
import Register from './pages/register';
import Integration from './pages/integration';
import Utils from './shared/utils';
import ProductsPage from './pages/products';
import OrdersPage from "./pages/orders"
import Dashboard from './pages/dashboard';
import { Helper } from './shared/libs/helper';
import { useEffect } from "react"
import UserService from "./shared/services/user-service"
import AuthService from "./shared/services/auth-service"
import { User } from "./shared/models/user"
import firebase from './shared/utils/firebase'
import Profile from './pages/profile';
import { languageActions } from '.';

const { Firebase } = Utils;

interface AppProps {
  language: string,
  supportedLanguages: any
}


function App(props: AppProps) {

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        AuthService.getUserData().then(curr => {
          UserService.currentUser = curr
          languageActions.next({ value: curr.lang })
        }).catch(err => {
          console.log(err.message)
        })
      }
    });
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={() => (Helper.getUserID() ? (<Redirect to="/listings" />) : (<Landing />))} />
        {/* <Route path='/profile' render={() => (Helper.getUserID() ? (<Redirect to="/listings" />) : (<Profile />))} /> */}
        <Route path='/products' render={() => (Helper.getUserID() ? (<ProductsPage />) : (<Redirect to="/login" />))} />
        <Route path='/profile' render={() => (Helper.getUserID() ? (<Profile />) : (<Redirect to="/login" />))} />
        <Route path='/orders' render={() => (Helper.getUserID() ? (<OrdersPage />) : (<Redirect to="/login" />))} />
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
