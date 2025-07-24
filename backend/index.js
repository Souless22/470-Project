import express from 'express';
import dotenv from 'dotenv';
import dbconnect from './DB/dbconnect';

const app = express();

dotenv.config();

app.get('/', (req,res) => {
    res.send('Server is running');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    dbconnect();
    console.log(`Working at ${PORT}`);
});