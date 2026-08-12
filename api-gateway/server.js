import dotenv from "dotenv";
dotenv.config();

import { app, socketProxy } from "./src/app.js";

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, "27.59.110.208/32", () => {
  console.log(`API Gateway running on ${PORT}`);
});


server.on("upgrade", socketProxy.upgrade);