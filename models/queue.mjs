'use strict';
import kue from 'kue';

//for singleton pattern
let queueInstance;

export default class Queue {
    constructor(config) {
        if (!queueInstance) {
            console.log("Kue instance Created!");
            queueInstance = kue.createQueue(config);
        }
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
