//TO_DO solve import statement load direction
'use strict';
/**
 * app imports
 */
import express from 'express';
import cors from 'cors';
import { router } from './controller';
import Queue from './models/queue';
import DB from './models/db';

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
const sequelize = new DB(global.config.db);

sequelize.dbInstance.authenticate()
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
app.listen(global.config.port, () => {
    console.log(`Server running on ${global.config.port}`);
});