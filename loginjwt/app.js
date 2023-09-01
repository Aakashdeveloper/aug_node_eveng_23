import express from 'express';
import cors from 'cors';
const app = express();
import db from './db.js';
import AuthController from './controller/AuthController';
const port = process.env.PORT || 5000;

app.use(cors());
app.use('/api/auth',AuthController);

app.listen(port,() => {
    console.log(`listening on port ${port}`)
})