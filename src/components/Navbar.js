import React from "react";
import { NavLink } from "react-router-dom";
import Menulist from "../static/menu.json";
export default function Navbar() {  

  const linkList = Menulist.map((item) => {
    return (
      <div className="col" key={item.id}>
        <NavLink exact to={`${item.linkto}`}>{item.title}</NavLink>
      </div> 
    );
  });
  return (
    <div>
      <div className="container navbar-level-level">
        <div className="row">
          {linkList}          
        </div>
      </div>      
    </div>
  );
}
