import React, { useState } from "react";
import { Grid } from '@material-ui/core';
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function Header() { 

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
