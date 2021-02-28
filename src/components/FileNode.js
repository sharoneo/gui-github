import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';

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
    const { id, linkto, title, submenu, leaf, url} = this.props;
    const { open } = this.state;    

    if (!submenu) {
      
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
        </li>
      );
    }    
  }
}

export default FileNode;
