import dotenv from "dotenv";
dotenv.config();

import { app, socketProxy } from "./src/app.js";



const server = app.listen(8000, () => {
  console.log(`API Gateway running on 8000`);
});

// WebSocket upgrade requests ko manually socket proxy tak route karna padta hai
server.on("upgrade", socketProxy.upgrade);