import React, { Component } from 'react';
import i18n from 'i18next';
//import { Translation } from 'react-i18next';

const LanguageContext = React.createContext({
  language: "en",
  changeLanguage: () => {}
});

export class LanguageContextProvider extends Component {   
  //const [ language, setLanguage ] = useState('en');
  state = {
    language: "en"
  }  

  changeLanguage = (lang) => {
    this.setState({language: lang});
    i18n.changeLanguage(lang); 
  }
  
  render() {
    const { language } = this.state;
    const changeLanguage = this.changeLanguage;
    return (
      <LanguageContext.Provider value={{language, changeLanguage}}>
          {this.props.children}
      </LanguageContext.Provider>
      
    );
  }
  
}

export default LanguageContext;

