import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../css/PROSModal.css';
import { withTranslation } from 'react-i18next';
import {
  Button, IconButton, TextField, Select, InputBase, Grid
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


class PROSModalClass extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataCfg: this.props.editCfg
    };
    console.log("=sh= dataCfg=", JSON.stringify(this.state.dataCfg));
  }

  static propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    onModalApply: PropTypes.func,
    onModalCancel: PropTypes.func,
    editCfg: PropTypes.object
  }
  static defaultProps = {
    visible: true,
    title: '',
    onModalApply: () => { },
    onModalCancel: () => { },
    editCfg: {}
  }

  setInputValueNum(e) {
    console.log("setInputValueNum target id =", e.target.id);
    let dataObj = { ...this.state.dataCfg };
    dataObj.cfg[e.target.id] = parseInt(e.target.value);
    this.setState({ ...dataObj });
    //console.log("setInputValueNum=",JSON.stringify(dataObj));
  }

  render() {
    const { t } = this.props;
    const {
      visible,
      title,
      onModalApply,
      onModalCancel
    } = this.props,
      show = {
        zIndex: 2000,
        opacity: 1
      },
      hide = {
        zIndex: -1,
        opacity: 0
      },
      contShow = {
        width: '70%',
      },
      contHide = {
        width: '0px',
        height: '0px'
      };

    let { dataCfg } = this.state;
    //let { ifcObjArr } = this.state.pageData;
    let WAN_PROTO_OFF = 0x01;
    let WAN_PROTO_DHCPC6 = 0x02;
    let WAN_PROTO_BRIDGE = 0x04;
    let WAN_PROTO_MGMT_RT = 0x08;
    let WAN_PROTO_WIFI = 0x10;
    let WAN_PROTO_DHCPC4 = 0x20;
    let WAN_PROTO_STATIC_IP4 = 0x40;
    let WAN_PROTO_PPPOE4 = 0x80;
    let ptlObj = {
      "ETHNET": [{
        "val": WAN_PROTO_BRIDGE,
        "label": "BRIDGE"
      }, {
        "val": WAN_PROTO_PPPOE4,
        "label": "PPPOE_CLIENT"
      }, {
        "val": WAN_PROTO_STATIC_IP4,
        "label": "STATIC_IPV4"
      }, {
        "val": WAN_PROTO_DHCPC4,
        "label": "DHCP_V4"
      }],
      "WIFI": [{
        "val": WAN_PROTO_BRIDGE,
        "label": "BRIDGE"
      }, {
        "val": WAN_PROTO_WIFI,
        "label": "WIFI"
      }],
      "MOBILE_APN": [{
        "val": WAN_PROTO_BRIDGE,
        "label": "BRIDGE"
      }, {
        "val": WAN_PROTO_DHCPC4,
        "label": "DHCP_V4"
      }],
      "MOBILE_APN2": [{
        "val": WAN_PROTO_BRIDGE,
        "label": "BRIDGE"
      }, {
        "val": WAN_PROTO_DHCPC4,
        "label": "DHCP_V4"
      }]
    };

    let ifcObjArr = [{
      "id": 1,
      "label": "WAN Ethernet",
      "iface": "eth1",
      "ifc_type": "ETHNET"
    }, {
      "id": 3,
      "label": "Mobile#1_APN",
      "iface": "eth2.1",
      "ifc_type": "MOBILE_APN"
    }, {
      "id": 55,
      "label": "WAN WiFi (2.4 GHz)",
      "iface": "ath11",
      "ifc_type": "WIFI"
    }, {
      "id": 56,
      "label": "WAN WiFi (5 GHz)",
      "iface": "ath31",
      "ifc_type": "WIFI"
    }];

    let VLAN_SUBNET_NONE = 0;
    let VLAN_SUBNET_1 = 101;
    let VLAN_SUBNET_2 = 102;
    let VLAN_SUBNET_3 = 103;
    let VLAN_SUBNET_4 = 104;
    let VLAN_SUBNET_5 = 105;
    let VLAN_SUBNET_6 = 106;
    let VLAN_SUBNET_7 = 107;
    let VLAN_SUBNET_8 = 108;

    /* let VLAN_SUBNET_ARR = [VLAN_SUBNET_1, VLAN_SUBNET_2, VLAN_SUBNET_3, VLAN_SUBNET_4,
      VLAN_SUBNET_5, VLAN_SUBNET_6, ]
 */
    return (
      <div className="gy-modalContainer" style={visible ? show : hide}>
        <div className="mask" onClick={() => onModalCancel()}></div>
        <div className="innerContent modal-dialog-scrollable" style={visible ? contShow : contHide}>
          
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" color="primary">{t('CONN_TBL_TITLE')}-{title}</h5>
              <IconButton aria-label="Close" className="padding-0" onClick={() => onModalCancel()}>
        <CloseIcon />
      </IconButton>
              {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
            </div>
            <div className="modal-body">
              <Grid container item xs={12} spacing={1}>
                <Grid item sm={3} xs={12}>
                  <InputBase
                    className="base-input"
                    value={t('INTERFACE')} />
                </Grid>
                <Grid item sm={6} xs={12}>
                  {<Select
                    native
                    value={dataCfg.cfg.iface_id}
                    onChange={(e) => this.setInputValueNum(e)}
                    fullWidth
                    inputProps={{
                      name: 'iface_id',
                      id: 'iface_id'
                    }}
                  >
                    {ifcObjArr.map(
                      (item, idx) => {
                        return (<option key={item.id} value={item.id}>{item.label}</option>)
                      }
                    )}
                  </Select>}
                </Grid>
              </Grid>

              <Grid container item xs={12} spacing={1}>
                <Grid item sm={3} xs={12}>
                  <InputBase
                    className="base-input"
                    value={t('PROTOCOL')} />
                </Grid>
                <Grid item sm={6} xs={12}>
                  {<Select
                    native
                    value={dataCfg.cfg.protocol_val}
                    onChange={(e) => this.setInputValueNum(e)}
                    fullWidth
                    inputProps={{
                      name: 'protocol_val',
                      id: 'protocol_val'
                    }}
                  >
                    {ptlObj["ETHNET"].map(
                      (item, idx) => {
                        return (<option key={item.val} value={item.val}>{item.label}</option>)
                      }
                    )}
                  </Select>}

                </Grid>
              </Grid>

              <Grid container item xs={12} spacing={1}>
                <Grid item sm={3} xs={12}>
                  <InputBase
                    className="base-input"
                    value={t('BRIDGE_INTERFACE')} />
                </Grid>
                <Grid item sm={6} xs={12}>
                  {<Select
                    native
                    value={dataCfg.cfg.bridge_iface_id}
                    onChange={(e) => this.setInputValueNum(e)}
                    fullWidth
                    inputProps={{
                      name: 'bridge_iface_id',
                      id: 'bridge_iface_id'
                    }}
                  >
                    <option value={VLAN_SUBNET_1}>NET1</option>
                    <option value={VLAN_SUBNET_2}>NET2</option>
                    <option value={VLAN_SUBNET_3}>NET3</option>
                    <option value={VLAN_SUBNET_4}>NET4</option>
                    <option value={VLAN_SUBNET_5}>NET5</option>
                    <option value={VLAN_SUBNET_6}>NET6</option>
                    <option value={VLAN_SUBNET_7}>NET7</option>
                    <option value={VLAN_SUBNET_8}>NET8</option>
                  </Select>}

                </Grid>
              </Grid>

              <Grid container item xs={12} spacing={1}>
                <Grid item sm={3} xs={12}>
                  <InputBase
                    className="base-input"
                    value={t('PRIORITY')} />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    hiddenLabel
                    fullWidth
                    id="prio"
                    type="number"
                    value={dataCfg.cfg.prio}
                    variant="filled"
                    onChange={(e) => this.setInputValueNum(e)}
                    inputProps={{ min: "1", max: "20", step: "1" }}
                  />
                </Grid>
              </Grid>

              <Grid container item xs={12} spacing={1}>
                <Grid item sm={3} xs={12}>
                  <InputBase
                    className="base-input"
                    value={t('ECMP_WEIGHT')} />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    hiddenLabel
                    fullWidth
                    id="ecmp_weight"
                    type="number"
                    value={dataCfg.cfg.ecmp_weight}
                    variant="filled"
                    onChange={(e) => this.setInputValueNum(e)}
                    inputProps={{ min: "1", max: "100", step: "1" }}
                  />
                </Grid>
                <Grid item sm={3} xs={12}>
                  <InputBase
                    className="base-input"
                    value={t('_0_OFF')} />
                </Grid>
              </Grid>

            </div>

            <div className="modal-footer">
              <Button className="m-left-right-20 btn btn-cancel" variant="contained"
                onClick={() => onModalCancel()}>
                {t('CANCEL')}
              </Button>
              <Button className="m-left-right-20 btn btn-apply" variant="contained" onClick={() => onModalApply(dataCfg)}>
                {t('APPLY')}
              </Button>
            </div>

          </div>

        </div>
      </div>
    )
  }
}

const PROSModal = withTranslation()(PROSModalClass);
export default PROSModal;