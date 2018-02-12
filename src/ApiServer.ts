import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import { Endpoint } from "./lib/Endpoint";
import AuthType from "./routes/controller/viron_authtype";
import Root from "./routes/Root";

class ApiServer {
  public express: express.Application;
  public endpoints: Endpoint<any>[] = [new Root(), new AuthType()];
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
      this.express.get(endpoint.route, endpoint.handler);
      this.express.use(endpoint.route, router);
    });
  }
}

export default new ApiServer().express;
