import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../context/app-context";
import { useTranslation } from 'react-i18next';
import * as PAPI from "../../utility/papi";

import EditWin from "./connection_table_modal.js";

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import {
  Container,
  Button, IconButton, TextField, Select, InputBase,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
  Paper, Grid
} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';


const ConnectionTable = () => {
  const { cfgShowLoading } = useContext(AppContext);
  const { t } = useTranslation();

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });  
  const classes = useStyles();

  const dfEditCfg = {
    idx: -1,
    cfg: {}
  };
  
  const [cfgdata, setCfgdata] = useState({}); 
  
  const [showModal, setShowModal] = useState(false);
  const [editCfg, setEditCfg] = useState(dfEditCfg);
  //const classes = useStyles();
  let prof = "CONN_PROF_" + cfgdata.act_prof;
  let connProf = cfgdata[prof];
  console.log("connProfXX =", JSON.stringify(connProf));

  const getData = () => {
    PAPI.PApiGet({ url: "connection_table.cgi?act=config" })
      .then((data) => {
      console.log("config data====", JSON.stringify(data));  
        setCfgdata(data.config);
        setTimeout(() => {
          cfgShowLoading(false);
        }, 1000);
        
      })
      .catch((err) => {
        console.log(err);
        cfgShowLoading(false);
      });
  };

  const setData = () => {
    console.log("setData", JSON.stringify(cfgdata));
    PAPI.PApiGet({ url: "connection_table.cgi?act=config" })
      .then((data) => {
        //console.log("config data", JSON.stringify(data));  
        //let prof = "CONN_PROF_" + data.config.act_prof;
        //setConnProf(data.config[prof]);
        setCfgdata(data.config);
      })
      .catch((err) => console.log(err));
  };  

  useEffect(() => {
    console.log("=sh= useEffect cfgdata=", JSON.stringify(cfgdata));
    //setPfNum(() => new Array(cfgdata.prof_num).fill(0));
  }, [cfgdata]);

  /* useEffect(() => {
    console.log("=sh= connProf", JSON.stringify(connProf));
    setEditCfg(dfEditCfg);
    setShowModal(false);
  }, [connProf]); */

  useEffect(() => {
    console.log("=sh= entryEdit useEffect editCfg=", JSON.stringify(editCfg));
    if (Object.keys(editCfg).length > 0 && editCfg.idx >= 0) {
      setShowModal(true);
    }
  }, [editCfg]);

  useEffect(() => {
    cfgShowLoading(true);
    getData();
    //getData();
  }, []);



  function onModalApply(edCfg) {
    //console.log("onModalApply=", JSON.stringify(edCfg));
    //let applycfg = JSON.parse(JSON.stringify(cfgdata));
    let applycfg = { ...connProf };
    console.log("onModalApply applycfg(1)=", JSON.stringify(applycfg));
    applycfg["profile_list"][edCfg.idx] = edCfg.cfg;
    console.log("onModalApply applycfg(2)=", JSON.stringify(applycfg));
    //setConnProf(applycfg);
    setShowModal(false);
  }

  function onModalCancel() {
    setShowModal(false);

  }

  function entryEdit(idx) {
    let cfg = JSON.parse(JSON.stringify(connProf["profile_list"][idx]));
    console.log("=sh= entryEdit idx=", idx, JSON.stringify(cfg));
    setEditCfg({ idx, cfg });
    //console.log("=sh= entryEdit editCfg=", editCfg);
    //setShowModal(true);
  }

  function entryDelete(idx) {
    //let cfg = JSON.parse(JSON.stringify(connProf["profile_list"][idx]));
    let cfg = JSON.parse(JSON.stringify(cfgdata));
    let prof = "CONN_PROF_" + cfg.act_prof;
    let connProf = cfg[prof];
    console.log("=sh= entryDelete idx=", idx,connProf);
    connProf["profile_list"].splice(idx, 1);
    //setEditCfg({idx, cfg});
    console.log("=sh= entryDelete cfg=", JSON.stringify(cfg));
    setCfgdata({...cfg});
    //setShowModal(true);
  }

  function onApply() {
    console.log("onApply (cfgdata)=", JSON.stringify(cfgdata));
    setData();
    /* let applycfg = { ...connProf };
    applycfg["profile_list"][edCfg.idx] = edCfg.cfg;
    console.log("onModalApply applycfg(2)=", JSON.stringify(applycfg));
    setConnProf(applycfg); */
  }

  function onReset() {
    console.log("onReset=", JSON.stringify(cfgdata));
    cfgShowLoading(true);
    setTimeout(function () { getData(); }, 3000);
    //getData();

  }  

  const handleChangeProfile = (e) => {
    const act_prof = e.target.value;
    //let prof = "CONN_PROF_" + act_prof;
    setCfgdata({
      ...cfgdata,
      act_prof: e.target.value
    });
    //setConnProf({...cfgdata[prof]});
  };

  function setInputValue(e) {
    console.log("setInputValue target =", e.target.id, e.target.value);
    //const val = e.target.value;
    let prof = "CONN_PROF_" + cfgdata.act_prof;
    setCfgdata({
      ...cfgdata,
      [prof]: {
        [e.target.id]: e.target.value
      }
    });
    /* setConnProf({
      ...cfgdata[prof], 
      profile_name: e.target.value
    }); */

  }

  
/* 
  const classes = useStyles();
  let prof = "CONN_PROF_" + cfgdata.act_prof;
  let connProf = cfgdata[prof];
  console.log("connProfXX =", JSON.stringify(connProf));
   */
  return (cfgdata && Object.keys(cfgdata).length === 0 && cfgdata.constructor === Object) ? 
  '':
  (
    <>
      <div className="pageContainer">
        <div className="pageMainContainer">
          <div className="pageMain">
            {/* title */}
            <Typography variant="h6" gutterBottom color="primary" className="m-bottom-20">
              {t('CONN_TBL_TITLE')}
            </Typography>

            {/* config */}
            <Grid container spacing={1}>
              <Grid container item xs={12} spacing={1}>
                <Grid item md={3} xs={12}>
                  <InputBase
                    className="base-input"
                    value={t('PROFILE')} />
                </Grid>
                <Grid item md={5} xs={12}>
                  {<Select
                    native
                    value={cfgdata.act_prof} 
                    onChange={handleChangeProfile}
                    fullWidth
                    variant="filled"
                    inputProps={{
                      name: 'act_prof',
                      id: 'act_prof'
                    }}
                  >
                    {new Array(cfgdata.prof_num).fill(0).map(
                      (item, idx) => {
                        return (<option key={idx} value={idx + 1}>{idx + 1}</option>)
                      }
                    )}
                  </Select>}
                </Grid>
              </Grid>


              <Grid container item xs={12} spacing={1} my={5}>

                <Grid item md={3} xs={12}>
                  <InputBase
                    className="base-input"
                    value={t('NAME')} />
                </Grid>
                <Grid item md={5} xs={12}>
                  <TextField
                    hiddenLabel
                    id="profile_name"
                    value={connProf.profile_name}
                    variant="filled"
                    fullWidth
                    onChange={(e) => setInputValue(e)}
                  />
                </Grid>
              </Grid>

              <Grid container item xs={12} spacing={1} my={5}>
                <Grid item md={3} xs={12}>
                  <InputBase
                    className="base-input"
                    value={t('WAN_PORT_AS')}
                  />
                </Grid>
                <Grid item md={5} xs={12}>
                  <TextField
                    id="wan_work_as-text"
                    value={cfgdata.wan_port_as}
                    fullWidth
                    className="base-input"
                    InputProps={{
                      readOnly: true,
                      disableUnderline: true
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>


            {/* table */}
            <div className="p-top-bottom-30"></div>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align="center">{t('PRIORITY')}</TableCell>
                    <TableCell align="center">{t('ECMP_WEIGHT')}</TableCell>
                    <TableCell align="center">{t('INTERFACE')}</TableCell>
                    <TableCell align="center">{t('PROTOCOL')}</TableCell>
                    <TableCell align="center">{t('SVCPORT_ENTRY_ACTION')}</TableCell>
                    {/* <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Test</StyledTableCell> */}
                  </TableRow>
                </TableHead>
                {/* <TableBody> */}
                {!connProf["profile_list"] ?
                  (<TableBody><TableRow><TableCell></TableCell></TableRow></TableBody>) : (
                    <TableBody>
                      {connProf["profile_list"].map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell component="th" scope="row">
                            {idx + 1}
                          </TableCell>
                          <TableCell align="center">{item.prio}</TableCell>
                          <TableCell align="center">{item["ecmp_weight"]}</TableCell>
                          <TableCell align="center">{item["iface_id"]}</TableCell>
                          <TableCell align="center">{item.proto6}</TableCell>
                          <TableCell align="center">
                            <IconButton onClick={() => entryEdit(idx)}>
                              <EditIcon />
                            </IconButton>
                          &nbsp;&nbsp;
                          <IconButton onClick={() => entryDelete(idx)}>
                              <DeleteForeverIcon />
                            </IconButton>

                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  )
                }
                {/* </TableBody> */}
              </Table>
            </TableContainer>
          </div>
        </div>

        <div className="pageFooterContainer">
          <div className="pageFooter">
            <Button className="m-left-right-20 btn btn-cancel" variant="contained"
              onClick={() => onReset()}>
              {t('CANCEL')}
            </Button>
            <Button className="m-left-right-20 btn btn-apply" variant="contained" onClick={() => onApply()}>
              {t('APPLY')}
            </Button>
          </div>
        </div>
      </div>
      {!showModal ? '' : (<EditWin
        visible={showModal}
        title="Test Modal"
        onModalApply={(data) => { onModalApply(data); }}
        onModalCancel={() => { onModalCancel(); }}
        editCfg={editCfg}
      >
      </EditWin>)}
    </>
  );
};

export default ConnectionTable;
