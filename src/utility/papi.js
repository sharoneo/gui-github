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

var GUI_Flag = Demo;

var cgi = guiObj[GUI_Flag].cgi;
var baseurl = guiObj[GUI_Flag].baseurl;

export const PApiGet = async (obj) => {

  let objurl = obj.url;
  if (GUI_Flag == Demo) {
    if ((obj.url).indexOf('?') >= 0) {
      objurl = (obj.url).split('?').join('_');
    }
  }

  let url = baseurl + cgi + objurl;
  const response = await axios.get(url);
  return response.data;

}

export const PApiGetAll = async (requests) => {

  let promises = [];
  for (let i = 0; i < requests.length; i++) {
    let objurl = requests[i].url;
    if (GUI_Flag == Demo) {
      if ((requests[i].url).indexOf('?') >= 0) {
        objurl = (requests[i].url).split('?').join('_');
      }
    }
    let url = baseurl + cgi + objurl;
    promises.push(axios.get(url));
  }
  return await axios.all(promises);
}


