import axios from "axios";

const baseDomain = `${process.env.API_URL}/api/`;
const baseURL = `${baseDomain}`;

export default axios.create({
  baseURL
});
