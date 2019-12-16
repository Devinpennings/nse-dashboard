import axios from "axios";

const baseDomain = "http://b4cfcd2c.eu.ngrok.io/api/";
const baseURL = `${baseDomain}`;

export default axios.create({
  baseURL
});
