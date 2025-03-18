import express from 'express';
import cookieParser from "cookie-parser";
import logger from "morgan";
import { listenRabbitMQ } from '../../rabbitmqs/user-mail';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

listenRabbitMQ();

app.get('/mail/:id', (req, res, next) => {
    res.status(200).send(`Test >>>> ${req.params.id}`)
})

app.listen(8000, () => {
    console.log('Server running on 8000')
})