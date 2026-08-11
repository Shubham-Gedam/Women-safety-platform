import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectToDB from "./src/db/db.js";

connectToDB();


const PORT = process.env.PORT || 3004;


app.listen(PORT, () => {
  console.log(`Admin server is running on port ${PORT}`);
});