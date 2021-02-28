import React from "react";
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
  Typography, Tabs, Tab, Box
} from '@material-ui/core';

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
          <h6>{children}</h6>
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

const WanEthernet = () => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="pageMain">

        <Typography variant="h6" gutterBottom color="primary" className="m-bottom-20">
          {t('MENU_WAN_ETHERNET')}
        </Typography>
        <Tabs value={value} onChange={handleChange} aria-label="ethernet tabs">
          <Tab label={t('WANETHERNET_WORKAS_DHCP')} {...a11yProps(0)} />
          <Tab label={t('WANETHERNET_WORKAS_PPPOE')} {...a11yProps(1)} />
          <Tab label={t('WANETHERNET_WORKAS_STATIC')} {...a11yProps(2)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <DhcpWin />
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
