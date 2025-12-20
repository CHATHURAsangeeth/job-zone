import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { PORT } from './config/env.js';

const app = express();

app.get('/',(req,res)=>{
    res.send('Hello World!');
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});