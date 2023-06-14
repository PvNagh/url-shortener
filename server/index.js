import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import Connection from './database/Db.js';
import Routes from './routes/Routes.js';

dotenv.config();
const app = express();

Connection(process.env.DB_URL); 
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
  
app.use('/', Routes);

app.listen(process.env.PORT, () => console.log(`Server is running successfully on PORT ${process.env.PORT}`));