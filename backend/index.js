import express from 'express';
import dotenv from 'dotenv';
import dbconnect from './DB/dbconnect.js';
import authRouter from './route/authuser.js';
import messageRouter from './route/messageRoute.js'
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser)

app.use('/api/auth',authRouter)
app.use('/api/message',messageRouter)

app.get('/', (req,res) => {
    res.send('Server is running');
})



const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    dbconnect();
    console.log(`Working at ${PORT}`);
});