import express from 'express';
import axios from 'axios';
import { createClient } from 'redis';
const port = 7011;
const app = express();

const client =createClient({})



app.listen(port,() => {
    console.log(`listening on port ${port}`)
})