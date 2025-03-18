import express from 'express';
import cookieParser from "cookie-parser";
import logger from "morgan";

const app = express();
// connectRabbitMQ();

app.use(logger('dev'));
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/users', (req, res, next) => {
    res.send(["Tony", "Lisa", "Michael", "Ginger", "Food"])
})

app.listen(3000, () => {
    console.log('Server running on 3000');
})