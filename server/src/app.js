import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

import { AuthRouter, ShowcasesRouter, SpotifyRouter } from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/auth', AuthRouter);
app.use('/spotify', SpotifyRouter);
app.use('/showcases', ShowcasesRouter);

app.use(errorHandler);


export { app };