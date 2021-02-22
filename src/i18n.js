// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './language/locale-en.json';
import tw from './language/locale-zh-tw.json';
/* import fr from './language/locale-fr.json'; */

const resources = {
  en: {
    translation: en,
  },    
  'zh_tw': {
   translation: tw,
 },
  /* 'fr': {
   translation: fr,
 }, */
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',             //default language
  fallbackLng: 'en',     
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;