import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { SpotifyRouter } from './routes/spotify-router.js';
import { AuthRouter } from './routes';
const app = express();

app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/auth', AuthRouter);
// app.use(SpotifyRouter);

app.listen(3000, () => console.log('listening on port 3000'));