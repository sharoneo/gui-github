import React, { Component } from 'react';
import AppContext from "../../context/app-context";
import { withTranslation } from 'react-i18next';
import {
  Button, IconButton, TextField, InputBase, Grid, Input
} from '@material-ui/core';

import * as PAPI from "../../utility/papi";

import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

class WANEthPPPoEClass extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      cfg: {},
      showPassword: false
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
    PAPI.PApiGet({ url: "pppoe.cgi?act=config" })
      .then((data) => {
        this.setState((prevState, props) => ({
          cfg: data.config
        }));
        setTimeout(() => {
          cfgShowLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setTimeout(() => {
          cfgShowLoading(false);
        }, 1000);
        console.log(err)
      });
  };
  
  handleClickShowPassword = () => {
    const { showPassword } = this.state;    
    this.setState(() => ({
      showPassword: !showPassword
    }));
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  setInputValue = (e) => {
    this.setState((state) => ({
      cfg: {
        [e.target.id]: e.target.value
      }
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

  render() 
  {
    const { t } = this.props;
    const { showPassword } = this.state;
    let { cfg } = this.state;
    return (cfg && Object.keys(cfg).length === 0 && cfg.constructor === Object) ? 
    '':
    (
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
          <Input 
            hiddenLabel 
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'} 
            variant="filled" 
            fullWidth             
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

          
            {/* <FilledInput
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
            /> */}
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



