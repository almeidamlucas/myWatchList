require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/watch-list';

const port: number = 3333;
const app: express.Application = express();

mongoose.connect(process.env.MONGO_CREDENTIALS, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});