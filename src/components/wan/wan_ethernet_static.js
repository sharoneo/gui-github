import React, { Component } from 'react';
import AppContext from "../../context/app-context";
import { withTranslation } from 'react-i18next';
import {
  Button, TextField, InputBase, Grid
} from '@material-ui/core';

import * as PAPI from "../../utility/papi";

class WANEthStaticClass extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      wanst_cfg: {
        "ipv4_addr": "0.0.0.0",
        "ipv4_mask": "255.255.255.0",
        "gwv4_addr": "0.0.0.0"
      },
      dns_cfg: {
        "scenario": 2,
        "dns6_from": [2, 2, 2],
        "dns6_addr": ["", "", ""],
        "dns4_from": [1, 1, 1],
        "dns4_addr": ["", "", ""],
        "dns6_from_second": [0, 0, 0],
        "dns6_addr_second": ["", "", ""],
        "dns4_from_second": [0, 0, 0],
        "dns4_addr_second": ["", "", ""]
      }
    }
    console.log("cfgdata ==", this.state.cfg);
  }

  componentDidMount() {
    let vm = this;
    let { cfgShowLoading } = this.context;
    cfgShowLoading(true);
    setTimeout(function () {
      vm.getData();
      cfgShowLoading(false);
    }, 1000)
    //this.getData();
  }

  getData = () => {
    PAPI.PApiGet({ url: "wanst.cgi?act=config" })
      .then((data) => {

        this.setState((prevState, props) => ({
          wanst_cfg: data.config
        }));
        console.log("getData", JSON.stringify(this.state.cfg));
      })
      .catch((err) => console.log(err));

    PAPI.PApiGet({ url: "dns.cgi?act=config&index=5" })
      .then((data) => {

        this.setState((prevState, props) => ({
          dns_cfg: data.config
        }));
        console.log("getData", JSON.stringify(this.state.cfg));
      })
      .catch((err) => console.log(err));
  };


  setWanstInputValue = (e) => {
    console.log("setInputValue target =", e.target.id, e.target.value);

    this.setState((state, props) => ({
      wanst_cfg: {
        [e.target.id]: e.target.value
      }
    }));
  }

  setDnsInputValue = (e) => {
    let obj = {
      'dns4_addr_0': 0,
      'dns4_addr_1': 1,
      'dns4_addr_2': 2
    }
    console.log("setInputValueNum target id =", e.target.id, e.target.value);
    let dns_cfg = { ...this.state.dns_cfg };
    dns_cfg.dns4_addr[obj[e.target.id]] = e.target.value;
    this.setState((state, props) => ({
      dns_cfg
    }));
  }

  onApply = () => {
    console.log("onApply (cfg)=", JSON.stringify(this.state));
    /* etData(); */
  }

  onReset = () => {
    this.getData();
  }


  render() {
    const { t } = this.props;
    const { wanst_cfg, dns_cfg } = this.state;
    return (
      <>
        <div>          
          <div className="subTitle">{t('WANETHERNET_LEGEND_STATIC')}</div>
          <Grid container item xs={12} spacing={1}>
            <Grid item md={3} xs={12}>
              <InputBase
                className="base-input"
                value={t('WANETHERNET_IP_ADDRESS')} />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                hiddenLabel
                id="ipv4_addr"
                value={wanst_cfg.ipv4_addr}
                variant="filled"
                fullWidth
                onChange={(e) => this.setWanstInputValue(e)}
              />
            </Grid>
          </Grid>

          <Grid container item xs={12} spacing={1}>
            <Grid item md={3} xs={12}>
              <InputBase
                className="base-input"
                value={t('WANETHERNET_IP_MASK')} />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                hiddenLabel
                id="ipv4_mask"
                value={wanst_cfg.ipv4_mask}
                variant="filled"
                fullWidth
                onChange={(e) => this.setWanstInputValue(e)}
              />
            </Grid>
          </Grid>

          <Grid container item xs={12} spacing={1}>
            <Grid item md={3} xs={12}>
              <InputBase
                className="base-input"
                value={t('WANETHERNET_GATEWAY_ADDRESS')} />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                hiddenLabel
                id="gwv4_addr"
                value={wanst_cfg.gwv4_addr}
                variant="filled"
                fullWidth
                onChange={(e) => this.setWanstInputValue(e)}
              />
            </Grid>
          </Grid>
        </div>

        <div className="m-top-bottom-20">
        <div className="subTitle">{t('WANDNS_LEGEND_DNS')}</div>
          <Grid container item xs={12} spacing={1}>
            <Grid item md={3} xs={12}>
              <InputBase
                className="base-input"
                value={t('WANDNS_IPV4_DNS_SERVER') + " #1"} />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                hiddenLabel
                id="dns4_addr_0"
                value={dns_cfg.dns4_addr[0]}
                variant="filled"
                fullWidth
                onChange={(e) => this.setDnsInputValue(e)}
              />
            </Grid>
          </Grid>

          <Grid container item xs={12} spacing={1}>
            <Grid item md={3} xs={12}>
              <InputBase
                className="base-input"
                value={t('WANDNS_IPV4_DNS_SERVER') + " #2"} />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                hiddenLabel
                id="dns4_addr_1"
                value={dns_cfg.dns4_addr[1]}
                variant="filled"
                fullWidth
                onChange={(e) => this.setDnsInputValue(e)}
              />
            </Grid>
          </Grid>

          <Grid container item xs={12} spacing={1}>
            <Grid item md={3} xs={12}>
              <InputBase
                className="base-input"
                value={t('WANDNS_IPV4_DNS_SERVER') + " #3"} />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                hiddenLabel
                id="dns4_addr_2"
                value={dns_cfg.dns4_addr[2]}
                variant="filled"
                fullWidth
                onChange={(e) => this.setDnsInputValue(e)}
              />
            </Grid>
          </Grid>
        </div>

        <div className="pageFooterContainer p-top-bottom-30">
          <div className="pageFooter">
            <Button className="m-left-right-20 btn btn-cancel" variant="contained"
              onClick={() => this.onReset()}>
              {t('CANCEL')}
            </Button>
            <Button className="m-left-right-20 btn btn-apply" variant="contained" onClick={() => this.onApply()}>
              {t('APPLY')}
            </Button>
          </div>
        </div>

      </>
    );
  }
}

const WANEthStatic = withTranslation()(WANEthStaticClass);
export default WANEthStatic;



