import React, { useState } from "react";
import Menulist from "../static/menu.json";
import '../css/App.css'
import FileNode from './FileNode';
import PageRouters from '../router/pageRouter';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 186;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    heigh: "100%"
  },
  drawerPaper: {
    width: drawerWidth,
    top: 'auto',
    position: "static"
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Main = () => {
  let url;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // console.log("network route=",JSON.stringify(props.routes));
  const linkList = Menulist.map((item) => {
    url = item.linkto;
    return (<ul className="tree" key={item.id}><FileNode url={url} {...item} /></ul>);
  });

  // const linkList = Menulist[1].submenu.map((item) => {    
  //   return <FileNode url={url} {...item} />;
  // });  

  return (

    <div className="main-container">

      <div
        style={{
          padding: "0px",
          // width: "16%",
          width: "186px",
          height: "99%",
          background: "#f0f0f0",
          marginLeft: "auto",
          marginTop: "4px",
          overflowY: "auto",
          overflowX: "hidden"
        }}
      >

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className="menu-arrow">
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          {linkList}
        </Drawer>
      </div>

      <div style={{
        padding: "0px 20px 0px 10px",
        width: "84%",
        height: "100%",
        background: "#f0f0f0",
        // marginLeft: "auto"
      }}>
      
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,            
          })}           
        >
        {/* <main> */}
          <div className="main-menu">
            <IconButton
              id="btn_menu" 
              color="primary"
              aria-label="open drawer"
              onClick={handleDrawerOpen}             
            // edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
              {/* <MenuIcon className={clsx(classes.menuButton, open && classes.hide)} /> */}
            </IconButton>
            
          </div>          
          <PageRouters />
        </main>

      </div>

    </div>
  );
};

export default Main;
