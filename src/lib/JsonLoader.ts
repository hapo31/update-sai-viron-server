import { Endpoint, RouteFuntionType, HandlerFunctionType } from "./Endpoint";

export abstract class JsonSender extends Endpoint<string> {
  constructor(private json: string) {
    super();
  }
  public method = "get";
  public handler: RouteFuntionType = (req, res, next) => {
    res.send(this.data);
  };

  protected data: HandlerFunctionType<string> = req => {
    return this.json;
  };
}
