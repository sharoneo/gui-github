import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../context/app-context";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import * as PAPI from "../../utility/papi";

export default function Dashboard() {
  const { cfgShowLoading } = useContext(AppContext);
  const { t } = useTranslation();
  //const classes = useStyles();
  //const bull = <span className={classes.bullet}>•</span>;
  const [status, setStatus] = useState({});

  useEffect(() => {
    cfgShowLoading(true);
    const getData = () => {
      PAPI.PApiGet({ url: "status.cgi?act=status" })
        .then((data) => {
          console.log("config data", JSON.stringify(data));
          setStatus(data.status);
        })
        .catch((err) => console.log(err));
    };
    getData();
    setTimeout(function () {
      cfgShowLoading(false);
    }, 1000);
  }, []);

  return (status.modem0) ? (
    <div className="m-bottom-20">
      <Typography
        variant="h6"
        gutterBottom
        color="primary"
        className="m-bottom-20"
      >
        {t("MENU_STATUS")}
      </Typography>

      <Grid container item xs={12} spacing={2}>
        <Grid item md={6} xs={12}>
          <div className="card card-pink">
            <div className="card-header card-header-pink">{t('STATUS_PANEL_TITLE_SIM1')}</div>
            <div className="card-main">
              <div className="main-title">{t('STATUS_MODEM_SIM_STATUS')}</div>
              <div className="main-description">{status.modem0.modem_sim_status}</div>
            </div>
            <div className="card-main">
              <div className="main-title">{t('STATUS_MODEM_OPERATOR_NAME')}</div>
              <div className="main-description">{status["modem0"].modem_operator_name}</div>
            </div>
            <div className="card-main">
              <div className="main-title">{t('STATUS_MODEM_SIM_IMSI')}</div>
              <div className="main-description">{status.modem0.modem_sim_imsi}</div>
            </div>
            <div className="card-main">
              <div className="main-title">{t('STATUS_MODEM_SIM_IMEI')}</div>
              <div className="main-description">{status.modem0.modem_sim_imei}</div>
            </div>
            <div className="card-main">
              <div className="main-title">{t('STATUS_PHONE_NUMBER')}</div>
              <div className="main-description">{status.modem0.phone_number}</div>
            </div>
            <div className="card-main">
              <div className="main-title">{t('STATUS_IPV4_ADDR')}</div>
              <div className="main-description">{status.lte_dpip0.ipinfo.ipRmt}</div>
            </div>
            <div className="card-main">
              <div className="main-title">{t('STATUS_IPV4_MASK')}</div>
              <div className="main-description">{status.lte_dpip0.ipinfo.ipMask}</div>
            </div>
            <div className="card-main">
              <div className="main-title">{t('STATUS_DEFAULT_GATEWAY')}</div>
              <div className="main-description">{status.lte_dpip0.ipinfo.default_gw}</div>
            </div>            
          </div>          
        </Grid>

        <Grid item md={6} xs={12}>
        <div className="card card-yellow">
            <div className="card-header card-header-yellow">{t('STATUS_PANEL_TITLE_WAN_ETH')}</div>
            <div className="card-main">
              <div className="main-title">{t('STATUS_IPV4_ADDR')}</div>
              <div className="main-description">{status.eth_proto4.ipRmt}</div>
            </div>
            <div className="card-main">
              <div className="main-title">{t('STATUS_IPV4_MASK')}</div>
              <div className="main-description">{status.eth_proto4.ipMask}</div>
            </div>
            <div className="card-main">
              <div className="main-title">{t('STATUS_DEFAULT_GATEWAY')}</div>
              <div className="main-description">{status.eth_proto4.default_gw}</div>
            </div>
            <div className="card-main">
              <div className="main-title">{t('WANDNS_IPV4_DNS_SERVER')} #1</div>
              <div className="main-description">{status.eth_proto4.dns4_1}</div>
            </div>
            <div className="card-main">              
              <div className="main-title">{t('WANDNS_IPV4_DNS_SERVER')} #2</div>
              <div className="main-description">{status.eth_proto4.dns4_2}</div>
            </div>
            <div className="card-main">
              <div className="main-title">{t('WANDNS_IPV4_DNS_SERVER')} #3</div>
              <div className="main-description">{status.eth_proto4.dns4_3}</div>
            </div>
            <div className="card-main">              
              <div className="main-title"></div>
              <div className="main-description"></div>
            </div>
            <div className="card-main">
              <div className="main-title"></div>
              <div className="main-description"></div>
            </div>
          </div>          
        </Grid>

        <Grid item md={6} xs={12}>
        <div className="card card-blue">
            <div className="card-header card-header-blue">{t('STATUS_PANEL_TITLE_WAN_WIFI')}</div>
            <div className="card-main">
              <div className="main-title">{t('STATUS_IPV4_ADDR')}</div>
              <div className="main-description">{status.wan_wifi_proto4.ipRmt}</div>
            </div>
            <div className="card-main">
              <div className="main-title">{t('STATUS_IPV4_MASK')}</div>
              <div className="main-description">{status.wan_wifi_proto4.ipRmt}</div>
            </div>
            <div className="card-main">
              <div className="main-title">{t('STATUS_DEFAULT_GATEWAY')}</div>
              <div className="main-description">{status.wan_wifi_proto4.ipMask}</div>
            </div>
            <div className="card-main">
              <div className="main-title">{t('WANDNS_IPV4_DNS_SERVER')} #1</div>
              <div className="main-description">{status.wan_wifi_proto4.dns4_1}</div>
            </div>
            <div className="card-main">
              <div className="main-title">{t('WANDNS_IPV4_DNS_SERVER')} #2</div>
              <div className="main-description">{status.wan_wifi_proto4.dns4_2}</div>
            </div>
            <div className="card-main">
              <div className="main-title">{t('WANDNS_IPV4_DNS_SERVER')} #3</div>
              <div className="main-description">{status.wan_wifi_proto4.dns4_3}</div>
            </div>
            <div className="card-main">
              <div className="main-title">{t('STATUS_WIFI_SSID')}</div>
              <div className="main-description">{status.wan_wifi.wan_wifi_ssid}</div>
            </div>
            <div className="card-main">
              <div className="main-title">{t('STATUS_WIFI_CHANNEL')}</div>
              <div className="main-description">{status.wan_wifi.wan_wifi_channel}</div>
            </div>
          </div>          
        </Grid>

        <Grid item md={6} xs={12}>
        <div className="card card-green">
            <div className="card-header card-header-green">{t('STATUS_PANEL_TITLE_LAN_ETH')}</div>
            <div className="card-main">
              <div className="main-title">{t('STATUS_IPV4_ADDR')}</div>
              <div className="main-description">{status.lan_status.addr}</div>
            </div>
            <div className="card-main">
              <div className="main-title">{t('STATUS_IPV4_MASK')}</div>
              <div className="main-description">{status.lan_status.mask}</div>
            </div>
            <div className="card-main">
              <div className="main-title">{t('STATUS_IPV6_ADDR')}</div>
              <div className="main-description">{status.current_lte_proto6.addr6_lan}</div>
            </div>
            <div className="card-main">
              <div className="main-title">{t('STATUS_IPV6_MASK')}</div>
              <div className="main-description">{status.current_lte_proto6.plen_lan}</div>
            </div>
            <div className="card-main">
              <div className="main-title">{t('WANDNS_IPV6_DNS_SERVER')} #1</div>
              <div className="main-description">{status.lan_status.dns6_1}</div>
            </div>
            <div className="card-main">
              <div className="main-title">{t('WANDNS_IPV6_DNS_SERVER')} #2</div>
              <div className="main-description">{status.lan_status.dns6_2}</div>
            </div>
            <div className="card-main">
              <div className="main-title">{t('WANDNS_IPV6_DNS_SERVER')} #3</div>
              <div className="main-description">{status.lan_status.dns6_3}</div>
            </div>
            <div className="card-main">
              <div className="main-title"></div>
              <div className="main-description"></div>
            </div>
          </div>          
        </Grid>

        {/* <Grid item md={6} xs={12}>
        <div className="card card-yellow">
            <div className="card-header card-header-yellow">Night</div>
            <div className="card-main">
              <div className="main-title">Hot Tub</div>
              <div className="main-description">description</div>
            </div>
            <div className="card-main">
              <div className="main-title">Hot Tub</div>
              <div className="main-description">description</div>
            </div>
            <div className="card-main">
              <div className="main-title">Hot Tub</div>
              <div className="main-description">description</div>
            </div>
            <div className="card-main">
              <div className="main-title">Hot Tub</div>
              <div className="main-description">description</div>
            </div>
            <div className="card-main">              
              <div className="main-title"></div>
              <div className="main-description"></div>
            </div>
            <div className="card-main">
              <div className="main-title"></div>
              <div className="main-description"></div>
            </div>
          </div>          
        </Grid>

        <Grid item md={6} xs={12}>
        <div className="card card-yellow">
            <div className="card-header card-header-yellow">Night</div>
            <div className="card-main">
              <div className="main-title">Hot Tub</div>
              <div className="main-description">description</div>
            </div>
            <div className="card-main">
              <div className="main-title">Hot Tub</div>
              <div className="main-description">description</div>
            </div>
            <div className="card-main">
              <div className="main-title">Hot Tub</div>
              <div className="main-description">description</div>
            </div>
            <div className="card-main">
              <div className="main-title">Hot Tub</div>
              <div className="main-description">description</div>
            </div>
          </div>          
        </Grid>

        <Grid item md={6} xs={12}>
        <div className="card card-green">
            <div className="card-header card-header-green">Night</div>
            <div className="card-main">
              <div className="main-title">Hot Tub</div>
              <div className="main-description">description</div>
            </div>
            <div className="card-main">
              <div className="main-title">Hot Tub</div>
              <div className="main-description">description</div>
            </div>
            <div className="card-main">
              <div className="main-title">Hot Tub</div>
              <div className="main-description">description</div>
            </div>
            <div className="card-main">
              <div className="main-title">Hot Tub</div>
              <div className="main-description">description</div>
            </div>
            <div className="card-main">              
              <div className="main-title"></div>
              <div className="main-description"></div>
            </div>
            <div className="card-main">
              <div className="main-title"></div>
              <div className="main-description"></div>
            </div>
          </div>          
        </Grid>

        <Grid item md={6} xs={12}>
        <div className="card card-green">
            <div className="card-header card-header-green">Night</div>
            <div className="card-main">
              <div className="main-title">Hot Tub</div>
              <div className="main-description">description</div>
            </div>
            <div className="card-main">
              <div className="main-title">Hot Tub</div>
              <div className="main-description">description</div>
            </div>
            <div className="card-main">
              <div className="main-title">Hot Tub</div>
              <div className="main-description">description</div>
            </div>
            <div className="card-main">
              <div className="main-title">Hot Tub</div>
              <div className="main-description">description</div>
            </div>
            <div className="card-main">              
              <div className="main-title"></div>
              <div className="main-description"></div>
            </div>
            <div className="card-main">
              <div className="main-title"></div>
              <div className="main-description"></div>
            </div>
          </div>          
        </Grid> */}
      </Grid>
    </div>
  ) : '';
}

//export default Dashboard;
