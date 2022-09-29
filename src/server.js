import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import cors from 'cors';

import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import { connectDB } from './config/connectDB';

const app = express();
app.use(cors());
// config for use req.param

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Use this if the 4th param is default value(false)
// job.start()

// add view engine

viewEngine(app);

// add router
initWebRoutes(app);

// connect Database
connectDB();

const port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log('Backend is running on port ' + port);
});
