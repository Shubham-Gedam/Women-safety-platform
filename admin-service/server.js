import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectToDB from "./src/db/db.js";

connectToDB();



app.listen(3004, () => {
  console.log(`Admin server is running on port 3004`);
});