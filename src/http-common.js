import axios from "axios";

export default axios.create({
  baseURL: "http://todo-app-nodejs-mysql.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});