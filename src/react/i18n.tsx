import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';
import {initReactI18next} from 'react-i18next';
import enGlobal from '../lang/en/global.json';
import enHome from '../lang/en/home.json';
import enPermission from '../lang/en/permission.json';
import zhGlobal from '../lang/zh/global.json';
import zhHome from '../lang/zh/home.json';
import zhPermission from '../lang/zh/permission.json';

// not like to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

const resources = {
  en: {
    global: enGlobal,
    home: enHome,
    permission: enPermission
  },
  zh: {
    global: zhGlobal,
    home: zhHome,
    permission: zhPermission
  }
};

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  //.use(initReactI18n)
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: resources,
    fallbackLng: 'en',
    debug: false,
    ns: ['home', 'global', 'permission'],
    defaultNS: 'home',
    keySeparator: '::',
    nsSeparator: '$$',
    initImmediate: false,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    react: { useSuspense: false }
  });

export default i18n;
