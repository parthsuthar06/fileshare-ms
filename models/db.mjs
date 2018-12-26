'use strict';
import sequelize from 'sequelize';

let dbInstance;

export default class DB {
    constructor({ host, username, password, database, dialect, port }) {
        if (!dbInstance) {
            console.log("Created new DB Instance!");
            dbInstance = new sequelize(database, username, password, { dialect, host, port });
        }
        this.dbInstance = dbInstance
    }
}