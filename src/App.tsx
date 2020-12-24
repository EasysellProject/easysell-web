import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
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
              <div>
                <Route exact path='/' component={Login} />
              </div>
            )

        }
        {/* <Route exact path='/' render={props => <Main {...props} />} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/user' component={User} />
          <Route path='/privacy' component={Privacy} />
          <Route path='/terms' component={Terms} />
          <Route path='/faq' component={FrequentlyAskedQuestions} />
          <Route path='/edit' component={TranscriptionResult} />
          <Route path='/feedback/:fileInfo' component={Evaluate} />
          <Route exact path='/feedback' component={Evaluate} /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
