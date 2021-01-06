import _ from 'underscore';
import eng from '../translations/eng.json'
import tr from '../translations/tr.json';
import az from '../translations/az.json';
import LanguageCodes from './language-codes';

export type LangCode = "en-US" | "tr-TR" | "az-Latn-AZ"

const messages: Record<LangCode, Record<string, string>> = {
    "tr-TR": tr,
    "en-US": eng,
    "az-Latn-AZ": az
}

let currentLanguage: LangCode = 'en-US'

if (!_.has(messages, currentLanguage)) {
    currentLanguage = "en-US"
}

export default {
    supportedLanguages: LanguageCodes,
    currentLanguage,
    messages
}