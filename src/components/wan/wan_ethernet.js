import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
  Container, Typography,
  Button, IconButton, TextField, Select, InputBase,
  Paper, Grid, Tabs, Tab, Box
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import * as PAPI from "../../utility/papi";

import DhcpWin from "./wan_ethernet_dhcp.js";
import PPPoEWin from "./wan_ethernet_pppoe.js";
import StaticWin from "./wan_ethernet_static.js";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));


const WanEthernet = () => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);

  const [wanst, setWanst] = useState();
  const [pppoe, setPppoe] = useState();

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getData = async () => {
    await PAPI.PApiGet({ url: "wanst.cgi?act=config" })
      .then((data) => {
        console.log("config data", JSON.stringify(data));
        setWanst(data);
      })
      .catch((err) => console.log(err));

    await PAPI.PApiGet({ url: "pppoe.cgi?act=config" })
      .then((data) => {
        console.log("config data", JSON.stringify(data));
        setPppoe(data);
      })
      .catch((err) => console.log(err));

    // PAPI.PApiGetAll(objdata)
    //   .then((data) => {
    //     console.log("config data", JSON.stringify(data));
    //     setStatus(data);
    //   })
    //   .catch((err) => console.log(err));

    //   axios.all([funcA(), funcB()])
    // .then(axios.spread((acct, perms) => {
    //   // axios 回傳的資料在 data 屬性
    //   console.table('FuncA 回傳結果', acct.data)
    //   // fetch 資料可以先在 function 內作 json()
    //   console.table('FuncB 回傳結果', perms)
    // }))
    // .catch((err) => { console.error(err) })

    // function funcA() {
    //   return axios.get('http://localhost:3000/users/1')
    // }



  };

  useEffect(() => {
    getData();
  }, []);

  function setInputValue(e) {
    /* console.log("setInputValue target =", e.target.id,e.target.value);
    let prof = "CONN_PROF_" + cfgdata.act_prof; 
    setCfgdata({
      ...cfgdata,
      [prof]: {
        [e.target.id]: e.target.value
      } 
    }); */
  }

  function onApply() {
    /* console.log("onApply (cfgdata)=", JSON.stringify(cfgdata));
    setData();     */
  }

  function onReset() {
    /* console.log("onReset=", JSON.stringify(cfgdata));
    getData();   */
  }

  return (
    <>
      <div className="pageMain">

        {/* <div className="pageMain"> */}

        <Typography variant="h6" gutterBottom color="primary" className="m-bottom-20">
          {t('MENU_WAN_ETHERNET')}
        </Typography>
        <Tabs value={value} onChange={handleChange} aria-label="ethernet tabs">
          <Tab label={t('WANETHERNET_WORKAS_DHCP')} {...a11yProps(0)} />
          <Tab label={t('WANETHERNET_WORKAS_PPPOE')} {...a11yProps(1)} />
          <Tab label={t('WANETHERNET_WORKAS_STATIC')} {...a11yProps(2)} />
        </Tabs>

        
        <TabPanel value={value} index={0}>
              <DhcpWin   />
            </TabPanel>            
            <TabPanel value={value} index={1}>
              <PPPoEWin />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <StaticWin />
            </TabPanel>
       
      </div>

    </>
  );
};

export default WanEthernet;
