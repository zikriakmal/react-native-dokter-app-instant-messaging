// utils/API.js
import axios from "axios";

export default axios.create({
  
  baseURL: "https://backoffice.dokterapp.zikri.my.id/api/v1/",
  responseType: "json"
});