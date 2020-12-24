import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl'
import App from './App';
import Utils from './shared/utils';

const { supportedLanguages, currentLanguage, messages } = Utils.Localization;

ReactDOM.render(
  <IntlProvider locale={currentLanguage} messages={messages[currentLanguage]}>
    <App language={currentLanguage} supportedLanguages={supportedLanguages} />
  </IntlProvider>,
  document.getElementById('root')
);

