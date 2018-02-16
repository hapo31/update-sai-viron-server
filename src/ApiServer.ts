import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import { Endpoint, HandlerFunctionType } from "./lib/Endpoint";
import AuthType from "./routes/viron_authtype";
import Root from "./routes/Root";
import Swagger from "./routes/Swagger";

class ApiServer {
  public express: express.Application;
  public endpoints: Endpoint<any>[] = [
    new Root(),
    new Swagger(),
    new AuthType()
  ];
  constructor() {
    this.express = express();
    this.setMiddleWares();
    this.routes();
  }

  private setMiddleWares() {
    this.express.use(logger("dev"));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.routes();
  }

  private routes() {
    const router = express.Router();
    this.endpoints.forEach(endpoint => {
      this.express.all(endpoint.route, endpoint.handler);
      this.express.use(endpoint.route, router);
    });
  }
}

export default new ApiServer().express;
