import axios from "axios";
import config from "../config";

const {BACKEND} = config[process.env.NODE_ENV];

export default axios.create({
  baseURL: BACKEND,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
  responseEncoding: 'utf8'
});