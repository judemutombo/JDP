import express from 'express';
import authRoute from './routes/auth.Route.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'

dotenv.config();
const App = express();

App.use(express.json());
App.use(cors({
    origin: 'http://localhost:3000',
    credentials : true
}));
App.use(cookieParser());
App.use('/auth', authRoute);

const PORT = process.env.PORT || 3000;

App.listen(PORT, function(){
    console.log('Server is running on port:' + PORT);
});