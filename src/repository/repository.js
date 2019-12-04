import axios from "axios";

const baseDomain = "http://4b63f83f.eu.ngrok.io/api/";
const baseURL = `${baseDomain}`;

export default axios.create({
  baseURL
});
