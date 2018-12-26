'use strict';
import sequelize from 'sequelize';

let databaseInstance;

export default class Database {
    constructor({ host, username, password, database, dialect, port }) {
        this.connection = new sequelize(database, username, password, { dialect, host, port });
    }

    // query(sql, args) {
    //     return new Promise((resolve, reject) => {
    //         this.connection.query(sql, args, (err, rows) => {
    //             if (err)
    //                 return reject(err);
    //             resolve(rows);
    //         });
    //     });
    // }
    // close() {
    //     return new Promise((resolve, reject) => {
    //         this.connection.end(err => {
    //             if (err)
    //                 return reject(err);
    //             resolve();
    //         });
    //     });
    // }
    // createTable(name) {
    //     return this.query(`IF OBJECT_ID(${name}) IS NULL`)
    //         .then(() => {
    //             return this.query(`CREATE TABLE ${name} (
    //                     name VARCHAR(255),
    //                     bucket VARCHAR(255),
    //                     url VARCHAR(255)
    //                 )`)
    //         })
    // }
}