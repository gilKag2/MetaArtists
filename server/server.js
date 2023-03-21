import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ShazamCoreApiRouter } from './routes/ShazamCoreApiRoute.js';
const app = express();

app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


app.use(ShazamCoreApiRouter);

app.listen(3000, () => console.log('listening on port 3000'));