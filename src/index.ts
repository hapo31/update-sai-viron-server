import * as express from "express";
import * as http from "http";
import * as debug from "debug";

import App from "./ApiServer";

const port = process.env.PORT || 8080;

const server = http.createServer(App);
server.listen(port);

const onError = (error: NodeJS.ErrnoException) => {
  if (error.syscall !== "listen") throw error;
  let bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
};

server.on("error", onError);
server.on("listening", onListening);

console.log(`server listening:http://localhost:${port}/`);
