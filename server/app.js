import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { AuthRouter } from './routes/index.js';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/auth', AuthRouter);
// app.use(SpotifyRouter);



export { app };