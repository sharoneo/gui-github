import React, { Component } from 'react';
import AppContext from "../../context/app-context";
import { withTranslation } from 'react-i18next';
import {
  Button, IconButton, TextField, InputBase, Grid
} from '@material-ui/core';

import * as PAPI from "../../utility/papi";

import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

//import '../css/PROSModal.css'

class WANEthPPPoEClass extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      cfg: {
        "idx": 0,
        "active": 0,
        "encap": 0,
        "szIfName": "",
        "mtu": 0,
        "szUsername": "",
        "szPassword": "",
        "conn_type": 0,
        "idle_timeout": 0,
        "szServiceName": ""
      },
      showPassword: false
    }
    console.log("cfgdata ==", this.state.cfg);
  }

  componentDidMount() {
    let vm = this;
    let { cfgShowLoading } = this.context;
    cfgShowLoading(true);
    //this.context.cfgShowLoading(true);
    setTimeout(function () {
      vm.getData();
      cfgShowLoading(false);
    }, 1000);
    //this.getData();
  }

  getData = () => {
    PAPI.PApiGet({ url: "pppoe.cgi?act=config" })
      .then((data) => {

        this.setState((prevState, props) => ({
          cfg: data.config
        }));
        console.log("getData", JSON.stringify(this.state.cfg));
      })
      .catch((err) => console.log(err));
  };

  onApply = () => {
    console.log("onApply cfg=", JSON.stringify(this.state.cfg));
    /* setData(); */

  }

  onReset = () => {
    console.log("onReset=", JSON.stringify(this.state.cfg));
    this.getData();

  }

  /* handleChange = (prop) => (event) => {
    this.setState((state, props) => ({
      values:{
        password: event.target.value
      }
    }));
    //setValues({ ...values, [prop]: event.target.value });
  };
 */
  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    /* this.setState((state, props) => ({
      values:{
        showPassword: !values.showPassword
      }
    })); */
    this.setState(() => ({
      showPassword: !showPassword
    }));
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  setInputValue = (e) => {
    console.log("setInputValue target =", e.target.id, e.target.value);
    this.setState((state) => ({
      cfg: {
        [e.target.id]: e.target.value
      }
    }));
  }

  onApply = () => {
    console.log("onApply cfg=", JSON.stringify(this.state.cfg));
    /* setData(); */

  }

  onReset = () => {
    this.getData();

  }
  // const {cfgShowLoading} = this.context;

  render() {
    const { t } = this.props;
    const { showPassword } = this.state;
    let { cfg } = this.state;
    return (
      <>        
        <div className="subTitle">{t('WANETHERNET_LEGEND_PPPOE')}</div>
        <Grid container item xs={12} spacing={1}>
          <Grid item md={3} xs={12}>
            <InputBase
              className="base-input"
              value={t('WANETHERNET_USER_NAME')} />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField
              hiddenLabel
              id="szUsername"
              value={cfg.szIfName}
              variant="filled"
              fullWidth
              onChange={(e) => this.setInputValue(e)}
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} spacing={1}>
          <Grid item md={3} xs={12}>
            <InputBase
              className="base-input"
              value={t('WANETHERNET_PASSWORD')} />
          </Grid>

          <Grid item md={6} sm={12}>
            <FilledInput
              hiddenLabel
              fullWidth
              id="szPassword"
              type={showPassword ? 'text' : 'password'}
              value={cfg.szPassword}
              onChange={(e) => this.setInputValue(e)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} spacing={1}>
          <Grid item md={3} xs={12}>
            <InputBase
              className="base-input"
              value={t('WANETHERNET_PPPOE_SZSERVICENAME')} />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField
              hiddenLabel
              id="szServiceName"
              value={cfg.szServiceName}
              variant="filled"
              fullWidth
              onChange={(e) => this.setInputValue(e)}
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

const WANEthPPPoE = withTranslation()(WANEthPPPoEClass);
export default WANEthPPPoE;



