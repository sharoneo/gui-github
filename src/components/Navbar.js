import React from "react";
import { NavLink } from "react-router-dom";
import Menulist from "../static/menu.json";
export default function Navbar() {
  

  /* Create an array of `<li>` items for each product */
  const linkList = Menulist.map((item) => {
    return (
      <div className="col" key={item.id}>
        <NavLink exact to={`${item.linkto}`}>{item.title}</NavLink>
      </div> 
      // <li key={item.id}>
      //   <NavLink exact to={`${item.linkto}`}>{item.title}</NavLink>
      // </li>
      // <li key={item.id}>
      //   {/* <Link to={`${url}/${item.id}`}>{item.title}</Link> */}
      //   <Link to={`${item.linkto}`}>{item.title}</Link>
      // </li>
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
