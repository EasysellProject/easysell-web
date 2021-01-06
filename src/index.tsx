import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Subject } from 'rxjs';
import { IntlProvider } from 'react-intl'
import 'react-flags-select/css/react-flags-select.css';

import { LangCode } from './shared/utils/localization'
import App from './App';
import Utils from './shared/utils';

type LanguageAction = {
  value: LangCode
}
export const languageActions = new Subject<LanguageAction>();


const { supportedLanguages, currentLanguage, messages } = Utils.Localization;



function Root(): JSX.Element {

  const [curLang, setCurLang] = useState<LangCode>(currentLanguage)
  useEffect(() => {
    languageActions.subscribe(action => {
      setCurLang(action.value)
    })
  }, [])
  return (
    <IntlProvider locale={curLang} messages={messages[curLang]}>
      <App language={curLang} supportedLanguages={supportedLanguages} />
    </IntlProvider>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));

