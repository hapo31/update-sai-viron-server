import { Request, Response, NextFunction } from "express-serve-static-core";

export abstract class Endpoint<T> {
  public abstract route: string;
  public abstract method: string | string[];
  public handler: RouteFuntionType = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.json(this.data(req));
  };

  protected abstract data: HandlerFunctionType<T>;
}

export type RouteFuntionType = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type HandlerFunctionType<T> = (req: Request) => T;
