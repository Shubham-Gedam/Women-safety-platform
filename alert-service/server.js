import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";
import app from "./src/app.js";
import connectToDB from "./src/db/db.js";
import { initSocket } from "./src/socket/socket.js";

connectToDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", 
  },
});

initSocket(io);
app.set("io", io); 



server.listen(3002, () => {
  console.log(`Alert server is running on 3002`);
});