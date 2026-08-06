import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js'
import connectToDB from './src/db/db.js';


connectToDB();

app.listen(3001 , () => {
    console.log("User server is running on 3001");
});
