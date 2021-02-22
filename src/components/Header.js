import React, { useState } from "react";
// import { BrowserRouter } from "react-router-dom";
import { Grid } from '@material-ui/core';
import Navbar from "./Navbar";
// import { useTranslation } from "react-i18next";
// import LanguageContext from "../context/language-context";
import LanguageSwitcher from "../components/LanguageSwitcher";

// const styles = theme => ({
//   select: {
//       '&:before': {
//           borderColor: 'white',
//       },
//       '&:after': {
//           borderColor: 'white',
//       }
//   },
//   icon: {
//       fill: 'white',
//   },
// });



export default function Header() {
  /* const { i18n } = useTranslation();
  const [language, setLanguage] = useState("en");

  const changeLang = (lang)=> {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  } */


 
  

  // const value = {language,setLanguage, changeLang};
  let logo = "./images/sh1.png";
  return (

    <div className="header">

      <Grid container item
        xs={12}
        spacing={1}>

        <Grid item
          xs={3}>
          <div className="logo">
            <img alt="Snow"
              src={logo}
              width="65"
              height="65" />
          </div>
        </Grid>

        <Grid item
          xs={9}>
          <div className="logo float-right">
            <LanguageSwitcher />
          </div>
        </Grid>
      </Grid>

    </div>
  );
}
