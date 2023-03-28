import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { AuthRouter } from './routes/index.js';
import * as dotenv from 'dotenv';
import connectDB from './mongodb/connect.js';

dotenv.config();

const app = express();

app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/auth', AuthRouter);
// app.use(SpotifyRouter);

const startServer = async (port) => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(port, () => console.log('listening on port ' + port));
  } catch (err) {
    console.error(err);
  }
};

startServer(4000);