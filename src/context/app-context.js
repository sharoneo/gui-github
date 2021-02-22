import React, { useState, useEffect, createContext } from "react";
import * as PAPI from "../utility/papi";
import Menulist from "../static/menu.json";


const AppContext = createContext({
  menulist:{},
  showloading: true, 
  cfgShowLoading: ()=>{}
});

export const AppContextProvider = ({ children })=> {
  
  //const [theme, setTheme] = useState('light');
  const [showloading, setShowloading] = useState(true);
  const [menulist, setMenulist] = useState({});
  
  // Method to update state
  const cfgMenulist = () => {
    setMenulist(Menulist);
    /* PAPI.PApiGet({ url: "menu.json" })
        .then((data) => {          
          setMenulist(data);
        })
        .catch((err) => console.log(err));    */ 
  }

  const cfgShowLoading = (isshow) => {
    setShowloading(isshow);
    console.log("isshow=",isshow, showloading)
  }  
  

  useEffect(() => {    
    cfgMenulist();
  }, []);

  return (
    <AppContext.Provider value={{ menulist, showloading, cfgShowLoading }}>
       {children}
    </AppContext.Provider>
  )
}


export default AppContext;