import React, { Component } from 'react';
import AppContext from "../../context/app-context";
import { withTranslation } from 'react-i18next';
import {
  Button, TextField, Select, InputBase, Grid
} from '@material-ui/core';
import * as PAPI from "../../utility/papi";

class WANEthDhcpClass extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      cfg: {}
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
    PAPI.PApiGet({ url: "dns.cgi?act=config&index=6" })
      .then((data) => {
        this.setState((prevState, props) => ({
          cfg: data.config
        }));        
        setTimeout(() => {
          cfgShowLoading(false);
        }, 1000);
      })
      .catch((err) => {
        cfgShowLoading(false);
        console.log(err)
      });
  };

  setInputValueNum = (e) => {
    let obj = {
      'dns4_from_0': 0,
      'dns4_from_1': 1,
      'dns4_from_2': 2
    };
    let cfg = { ...this.state.cfg };
    cfg.dns4_from[obj[e.target.id]] = parseInt(e.target.value);
    this.setState(() => ({
      cfg
    }));    
  }

  setInputValue = (e) => {
    let obj = {
      'dhcpc_dns4_addr_0': 0,
      'dhcpc_dns4_addr_1': 1,
      'dhcpc_dns4_addr_2': 2
    }
    let cfg = JSON.parse(JSON.stringify(this.state.cfg));
    cfg.dns4_addr[obj[e.target.id]] = e.target.value;
    this.setState((state, props) => ({
      cfg
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
    cfgShowLoading(true);
    setTimeout(function () { self.getData(); }, 1000);
  }

  render() {
    const { t } = this.props;
    const { cfg } = this.state;

    return (cfg && Object.keys(cfg).length === 0 && cfg.constructor === Object) ? 
    '':
    (
      <>
        <div className="subTitle">{t('WANDNS_LEGEND_DNS')}</div>

        <Grid container item xs={12} spacing={1}>
          <Grid item md={3} xs={12}>
            <InputBase
              className="base-input"
              value={t('WANDNS_IPV4_DNS_SERVER') + " #1"} />
          </Grid>

          <Grid item md={4} xs={12}>
            {<Select
              native
              value={cfg.dns4_from[0].toString()}
              onChange={(e) => this.setInputValueNum(e)}
              fullWidth
              inputProps={{
                id: 'dns4_from_0'
              }}
            >
              <option key="0" value="0">{t('WANDNS_DNS_SERVER_FROM_ISP')}</option>
              <option key="1" value="1">{t('WANDNS_DNS_SERVER_USER_DEFINED')}</option>
              <option key="2" value="2">{t('WANDNS_DNS_SERVER_NONE')}</option>

            </Select>}
          </Grid>

          <Grid item md={4} xs={12}>
            <TextField
              hiddenLabel
              id="dhcpc_dns4_addr_0"
              value={cfg.dns4_addr[0]}
              variant="filled"
              fullWidth
              onChange={(e) => this.setInputValue(e)}
              disabled={cfg.dns4_from[0] != 1}
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} spacing={1}>
          <Grid item md={3} xs={12}>
            <InputBase
              className="base-input"
              value={t('WANDNS_IPV4_DNS_SERVER') + " #2"} />
          </Grid>

          <Grid item md={4} xs={12}>
            {<Select
              native
              value={cfg.dns4_from[1].toString()}
              onChange={(e) => this.setInputValueNum(e)}
              fullWidth
              inputProps={{
                id: 'dns4_from_1'
              }}
            >
              <option key="0" value="0">{t('WANDNS_DNS_SERVER_FROM_ISP')}</option>
              <option key="1" value="1">{t('WANDNS_DNS_SERVER_USER_DEFINED')}</option>
              <option key="2" value="2">{t('WANDNS_DNS_SERVER_NONE')}</option>

            </Select>}
          </Grid>

          <Grid item md={4} xs={12}>
            <TextField
              hiddenLabel
              id="dhcpc_dns4_addr_1"
              value={cfg.dns4_addr[1]}
              variant="filled"
              fullWidth
              onChange={(e) => this.setInputValue(e)}
              disabled={cfg.dns4_from[1] != 1}
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} spacing={1}>
          <Grid item md={3} xs={12}>
            <InputBase
              className="base-input"
              value={t('WANDNS_IPV4_DNS_SERVER') + " #3"} />
          </Grid>

          <Grid item md={4} xs={12}>
            {<Select
              native
              value={cfg.dns4_from[2].toString()}
              onChange={(e) => this.setInputValueNum(e)}
              fullWidth
              inputProps={{
                id: 'dns4_from_2'
              }}
            >
              <option key="0" value="0">{t('WANDNS_DNS_SERVER_FROM_ISP')}</option>
              <option key="1" value="1">{t('WANDNS_DNS_SERVER_USER_DEFINED')}</option>
              <option key="2" value="2">{t('WANDNS_DNS_SERVER_NONE')}</option>

            </Select>}
          </Grid>

          <Grid item md={4} xs={12}>
            <TextField
              hiddenLabel
              id="dhcpc_dns4_addr_2"
              value={cfg.dns4_addr[2]}
              variant="filled"
              fullWidth
              onChange={(e) => this.setInputValue(e)}
              disabled={cfg.dns4_from[2] != 1}
            />
          </Grid>
        </Grid>

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

const WANEthDhcp = withTranslation()(WANEthDhcpClass);
export default WANEthDhcp;



