import React, {useState, useContext} from "react";
import LanguageContext from "../context/language-context";
import AppContext from "../context/app-context";

const Loading = () => {
  let { showloading } = useContext(AppContext);
  //const [showLoading, setshowLoading] = useState(true)

  return (
    <> 
      {showloading ? (
        <div className='loading-Container'>
          <div className='loader'>
            <div className='loader--dot'></div>
            <div className='loader--dot'></div>
            <div className='loader--dot'></div>
            <div className='loader--dot'></div>
            <div className='loader--dot'></div>
            <div className='loader--dot'></div>
          </div>
        </div>) : null
      }
    </>
  );
};

export default Loading;
