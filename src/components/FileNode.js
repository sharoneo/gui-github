import React, { Component } from 'react';
// import { NavLink, Route, Switch, useRouteMatch } from "react-router-dom";
import { NavLink } from "react-router-dom";
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import FolderIcon from '@material-ui/icons/Folder';
import DescriptionIcon from '@material-ui/icons/Description';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import StarIcon from '@material-ui/icons/Star';
import GradeIcon from '@material-ui/icons/Grade';
//import Menu from '@material-ui/core/Menu';
//import MenuItem from '@material-ui/core/MenuItem';

class FileNode extends Component {
  state = {
    open: false,
  };
  toggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  render() {
    // const { title, submenu } = this.props;
    const { id, linkto, title, submenu, leaf, url} = this.props;
    console.log("=sh= FileNode url = ",url, id);
    const { open } = this.state;    

    if (!submenu) {
      // return {title};
      // return (
      //   <li key={id}>
      //     <NavLink exact to={`${url}/${linkto}`}>{title}</NavLink>
      //   </li>
      // ) 
      if (leaf) {
        return (
          <li key={id}>
            <NavLink exact className="tree-file" to={`${url}${linkto}`}><RemoveOutlinedIcon style={{fontSize: "small"}} />&nbsp;{title}</NavLink>         
          </li>    
        )
        
      }
      else {
        return (<li key={id}>
          {title}
          </li>);
      }
      
    // return <li>{title}-{leaf?1:0}</li>;
    }
    else {
      return (
        <li className="section">        
          <div className={`tree-foler ${open ? 'open' : ''}`} onClick={this.toggle}>
          <KeyboardArrowRightIcon />&nbsp;{title}
          </div>
          {!open ? null : (
            <ul>
              {submenu.map((item) => (
                <FileNode url={url} {...item} key={item.id} />
              ))}
            </ul>
          )}
         {/* </div> */}
        </li>
      );
    }    
  }
}

export default FileNode;
