import React, { Component } from 'react';
import axios from 'axios';
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
      wanst_cfg: {},
      dns_cfg: {}
    }
  }

  componentDidMount() {
    let self = this;
    let { cfgShowLoading } = this.context;
    cfgShowLoading(true);
    self.getData();
  }

  getData = () => {
    let { cfgShowLoading } = this.context;
    let url_arr = [
      { url: "wanst.cgi?act=config" },
      { url: "dns.cgi?act=config&index=5" }
    ];
    PAPI.PApiGetAll(url_arr)
      .then(axios.spread((...args) => {        
        this.setState(() => ({
          wanst_cfg: {...args[0].data.config},
          dns_cfg: {...args[1].data.config}
        }));
        
      }))
      .catch((err) => console.log(err));    

    setTimeout(() => {
      cfgShowLoading(false);
    }, 1000);
  };


  setWanstInputValue = (e) => {
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
    let dns_cfg = { ...this.state.dns_cfg };
    dns_cfg.dns4_addr[obj[e.target.id]] = e.target.value;
    this.setState((state, props) => ({
      dns_cfg
    }));
  }

  onApply = () => {
    let self = this;
    let { cfgShowLoading } = this.context;
    console.log("onApply cfg=", JSON.stringify(this.state.cfg));
    cfgShowLoading(true);
    setTimeout(function () { self.getData(); }, 1000);
  }

  onReset = () => {
    let self = this;
    let { cfgShowLoading } = this.context;
    console.log("onReset=", JSON.stringify(this.state.cfg));
    cfgShowLoading(true);
    setTimeout(function () { self.getData(); }, 1000);
  }


  render() {
    const { t } = this.props;
    const { wanst_cfg, dns_cfg } = this.state;
    return (wanst_cfg && Object.keys(wanst_cfg).length === 0 && wanst_cfg.constructor === Object) ?
      '' :
      (
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



