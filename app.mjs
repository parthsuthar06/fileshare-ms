'use strict';
import express from 'express';
import cors from 'cors';
import { router } from './controller';
import Queue from './models/queue';
import Database from './models/database';

const app = express();
/**
 * confiqure Queue
 */
const queue = new Queue();
queue.qc.on('error', (err) => {
    console.log('Error : Queue not Connected...', err)
});
/**
 * configure database
 */
const sequelize = new Database({
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'admin',
    database: 'file_upload',
    dialect: 'mysql'
})

sequelize.connection.authenticate()
    .then(_ => console.log("Connection has been established successfully!"))
    .catch(err => {
        console.log("Error Occured while connecting to database", err);
    })
/**
 * cors setup
 */
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
/**
 * router setup
 */
app.use(router);
/**
 * server setup
 */
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});