import { app } from './app.js';
import connectDB from './mongodb/connect.js';

const startServer = async (port) => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(port, () => console.log('listening on port ' + port));
  } catch (err) {
    console.error(err);
  }
};

startServer(4000);