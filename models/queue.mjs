'use strict';
import kue from 'kue';
import Rest from '../services/rest';

//for singleton pattern
let queueInstance;

export default class Queue {
    constructor(config) {
        if (!queueInstance) {
            console.log("Kue instance Created!");
            queueInstance = kue.createQueue(config);
        }
        console.log("kue instance exist!")
        this.qc = queueInstance;
    }

    create(name, data) {
        console.log(`Queue ${name} created`);
        return this.qc.create(name, data);
    }
    /**
     * @param cb : (job, done)
     */
    process(name, cb) {
        console.log(`Queue ${name} processing...`);
        return this.qc.process(name, cb);
    }
}

function testApiCall(data) {
    return new Promise((resolve, reject) => {
        const rest = new Rest();
        rest.post("http://localhost:4006/upload", data, {}, (err, response, body) => {
            if (err) {
                reject(err);
            }
            resolve(body);
        });
    });
}
