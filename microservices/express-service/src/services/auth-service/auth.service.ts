import express from 'express';
import cookieParser from "cookie-parser";
import logger from "morgan";
import { connectRabbitMQ } from '../../rabbitmqs/user-mail';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/auth', (req, res, next) => {
    res.send(["Tony", "Lisa", "Michael", "Ginger", "Food"])
})

app.post('/auth/login', (req, res, next) => {
    connectRabbitMQ(req.body.email,"123456");
        res.send(["Tony", "Lisa", "Michael", "Ginger", "Food"])
    })

app.listen(3000, () => {
    console.log('Server running on 3000');
})