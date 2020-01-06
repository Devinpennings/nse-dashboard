import axios from "axios";

const baseDomain = `http://9f4124d1.eu.ngrok.io/api/`;
const baseURL = `${baseDomain}`;

export default axios.create({
  baseURL
});
