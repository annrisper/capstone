import express from "express";
import authRoutes from './routes/authRoutes';
import cookieParser from "cookie-parser";
import {Response,Request} from 'express'
import axios from 'axios'
import cors from 'cors'
const app = express();
app.use(express.json());

app.use(cors())  
app.use(cookieParser());
app.use('/api/v1', authRoutes);


export default app