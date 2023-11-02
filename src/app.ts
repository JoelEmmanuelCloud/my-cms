import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './db/connectDB';

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));



const port = Number(process.env.PORT);

const MONGO_URL = process.env.MONGO_URL as string;

const start = async () => {
    try {
        await connectDB(MONGO_URL);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`),
        );
    } catch (error) {
        console.log(error);
    }
};

start();