import {Response} from "superagent";

export function attachSuperagentLogger(req: any) {
  const callback = req.callback;
  console.log(
    "%s %s %s",
    req.method.padEnd("delete".length, " "),
    req.url,
    "(pending)"
  );

  req.callback = function (err: any, res: Response) {
    console.log(
      "%s %s %s",
      req.method.padEnd("delete".length, " "),
      req.url,
      res ? res.status : "-"
    );
    callback.call(req, err, res);
  };
}
