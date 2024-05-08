import 'dotenv/config';
import express from 'express';

import { setupMongo } from './database';
import { routes } from './routes';

const app = express();

app.use(express.json());

setupMongo()
  .then(() => {
    app.use(routes);

    app.listen(4000, () => {
      console.log('Server is running at port 4000');
    });
  })
  .catch((err) => {
    console.error(err.message);
  });
