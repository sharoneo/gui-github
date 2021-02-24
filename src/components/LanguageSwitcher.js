import React, { useContext } from 'react';
import LanguageContext from "../context/language-context";
import {
  MenuItem, FormControl, Select
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const LanguageSwitcher = (props) => {

  const { language, changeLanguage } = useContext(LanguageContext);
  const useStyles = makeStyles({
    select: {
      '&:before': {
        borderColor: 'white',
      },
      '&:after': {
        borderColor: 'white',
      }
    },
    root: {
      backgroundColor: '#EAEAEA'
    },
    icon: {
      fill: 'black',
    }
  });
  const classes = useStyles();
  return (
    <>
      <FormControl style={{ minWidth: 120, backgroundColor: '#EAEAEA' }}>
        <Select
          value={language}
          onChange={(e) => { changeLanguage(e.target.value) }}
          inputProps={{
            classes: {
              root: classes.root,
              icon: classes.icon,
            },
          }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="zh_tw">中文</MenuItem>
        </Select>
      </FormControl>

    </>
  );
}

export default LanguageSwitcher;