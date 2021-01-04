import axios from "axios";

export default axios.create({
  baseURL: "https://todo-app-nodejs-mysql.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});