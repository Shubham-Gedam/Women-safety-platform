import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js'
import connectToDB from './src/db/db.js';


connectToDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Auth server is running on ${PORT}`);
});
