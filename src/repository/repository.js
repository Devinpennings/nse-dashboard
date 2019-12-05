import axios from "axios";

const baseDomain = "http://fdc3681e.eu.ngrok.io/api/";
const baseURL = `${baseDomain}`;

export default axios.create({
  baseURL
});
