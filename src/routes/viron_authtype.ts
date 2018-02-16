import {
  Endpoint,
  RouteFuntionType,
  HandlerFunctionType
} from "../lib/Endpoint";

type ReturnType =
  | {
      type: string;
      provider: string;
      url: string;
      method: string;
    }[]
  | {}[];

export default class AuthType extends Endpoint<ReturnType> {
  route = "/controller/viron_authtype";
  method = "GET";
  data: HandlerFunctionType<ReturnType> = req => {
    return [
      {
        type: "email",
        provider: "",
        url: "/sign_in",
        method: "POST"
      },
      {
        type: "signout",
        provider: "",
        url: "/signout",
        method: "POST"
      }
    ];
  };
}
