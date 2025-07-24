import express from 'express';
import dotenv from 'dotenv';
import dbconnect from './DB/dbconnect.js';
import authRouter from './route/authuser.js';

const app = express();

dotenv.config();

app.use(express.json());

app.use('/api/auth',authRouter)

app.get('/', (req,res) => {
    res.send('Server is running');
})



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    dbconnect();
    console.log(`Working at ${PORT}`);
});