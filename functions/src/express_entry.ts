import * as express from "express";
import app from "./main";

// cloud-functions-emulator does not support Node v8.x,
// so it uses express as is to serve functions locally.
// https://github.com/GoogleCloudPlatform/cloud-functions-emulator

express()
  .use("/api", app)
  .listen(3000, () => {
    console.log("wait for requests...");
  });
