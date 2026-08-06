import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";



app.listen(3003, () => {
  console.log(`Notification server is running on port 3003`);
});