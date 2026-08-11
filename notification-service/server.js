import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";



const PORT = process.env.PORT || 3003;


app.listen(PORT, () => {
  console.log(`Notification server is running on port ${PORT}`);
});