import axios from 'axios';

var guiObj = [
  //Demo(Mockdata)
  {
    cgi: "./mockconfig/",
    baseurl: ""
    //baseurl: "http://localhost:3000"
  },
  //Debug (CROS)
  {
    cgi: "/cgi-bin/",
    baseurl: "http://192.168.1.35"
  },
  //Release
  {
    cgi: "/cgi-bin/",
    baseurl: ""
  }
];

var Demo = 0; //mockdata
var Debug = 1; //CROS
var Release = 2; 

//###
var GUI_Flag = Demo;

var cgi = guiObj[GUI_Flag].cgi;
var baseurl = guiObj[GUI_Flag].baseurl;

export const PApiGet = async (obj) => {
  
  let objurl = obj.url;
  if(GUI_Flag == Demo) {
    if((obj.url).indexOf('?') >= 0) {
      objurl = (obj.url).split('?').join('_');
    }
  }  
  
  let url = baseurl + cgi + objurl;
  console.log("GUI_Flag=", GUI_Flag,"   /  objurl = ",url);
  const response = await axios.get(url);
  return response.data;

  // try {
  //   const res = await fetch(url, {
  //                 headers: {
  //                     'Content-Type': 'application/json',
  //                     'Accept': 'application/json'
  //                 }
  //             });
  //   if (res){
  //     const resp = await res.json();
  //     return resp;
  //   }
  // }
  // catch (e){
  //   console.log('Fail:', e);
  // }

  // return null;


}

// export const PApiGetAll = async (objArr) => {
//   console.log("papi_get  obj = ",objArr);
//   //let url = cgi + obj.url;
//   let url = "";
//   let axiosfunArr = [];
//   // objArr.map((item) =>{
//   //     url = cgi + item.url;
//   //     let func = function() {
//   //       return axios.get(url);
//   //     };
//   //     axiosfunArr.push(func);
//   //   }    
//   // );
    
//   // const response = await axios.get(url);
//   // return response.data
//   function funcA() {
//     return axios.get(cgi+"connection_table.cgi_act=config");
//   }
//   function funcB() {
//     return axios.get(cgi+"connmgr.cgi_act=ping_health_config");
//   }

//   const response = await axios.all([funcA(), funcB()]);
//   return response.data
  // axios.all([funcA(), funcB()])
  //   .then(axios.spread((acct, perms) => {
  //     // axios 回傳的資料在 data 屬性
  //     console.table('FuncA 回傳結果', acct.data)
  //     // fetch 資料可以先在 function 內作 json()
  //     console.table('FuncB 回傳結果', perms)
  //   }))
  //   .catch((err) => { console.error(err) })
    
  // try {
  //   const res = await fetch(url, {
  //                 headers: {
  //                     'Content-Type': 'application/json',
  //                     'Accept': 'application/json'
  //                 }
  //             });
  //   if (res){
  //     const resp = await res.json();
  //     return resp;
  //   }
  // }
  // catch (e){
  //   console.log('Fail:', e);
  // }

  // return null;


//}

// export const PApiGet = async (obj) => {
//   //console.log("papi_get  obj = ",obj);
//   let url = cgi + obj.url;
//   try {
//     const res = await fetch(url, {
//                   headers: {
//                       'Content-Type': 'application/json',
//                       'Accept': 'application/json'
//                   }
//               });
//     if (res){
//       const resp = await res.json();
//       return resp;
//     }
//   }
//   catch (e){
//     console.log('Fail:', e);
//   }

//   return null;


// }