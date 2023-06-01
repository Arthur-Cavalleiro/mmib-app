import axios from "axios";

const JsonServerHandler = axios.create({
  baseURL: "http://localhost:3002/notificacoes",
});

export default JsonServerHandler;