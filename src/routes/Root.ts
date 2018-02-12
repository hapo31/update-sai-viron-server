import {
  Endpoint,
  RouteFuntionType,
  HandlerFunctionType
} from "../lib/Endpoint";

type ReturnType = any;

export default class Root extends Endpoint<ReturnType> {
  route = "/";
  method = "GET";
  data: HandlerFunctionType<ReturnType> = req => {
    return {
      message: "hello, world"
    };
  };
}
