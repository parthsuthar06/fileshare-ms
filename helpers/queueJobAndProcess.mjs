'use strict';

import Queue from "../models/queue.mjs";
import AWSS3 from "../models/aws-s3.mjs";
import Upload from "../models/upload.mjs";

export function addJobAndProcess(name, data) {
    const queue = new Queue();
    const s3 = new AWSS3()
    //queue the job
    const job = queue.create(name, data).save();

    job.on('complete', async (result) => {
        //store the result into database
        try {
            console.log(`Job completed with ${name} Queue`, result);
            const model = new Upload();
            const uploadParams = {
                bucket: result.Bucket,
                name: result.Key,
                url: result.Location,
                etag: result.ETag
            }
            const d = await model.create(uploadParams)
            console.log("Job SQL CREATE database", d);
        } catch (e) {
            console.log(`Job ${name} Completion ERROR`, e);
        }
    })
    //process the job
    queue.process(name, async (job, done) => {
        //upload to s3 bucket
        try {
            const params = await s3.getParams(data);
            const result = await s3.upload(params);
            done(null, result); //pass it on to 'complete' event
        } catch (e) {
            console.log(`Queue ${name} Process ERROR`, e);
        }
    });
}

export function deleteJobAndProcess(name, data) {
    const queue = new Queue();
    const s3 = new AWSS3()
    //queue the job
    const job = queue.create(name, data).save();

    job.on('complete', async (result) => {
        //delete the result from database
        try {
            console.log(`Job completed with ${name} Queue`, result);
            const model = new Upload();
            const id = data.id;
            const d = await model.delete(data.id)
            console.log("Job SQL Delete database", d);
        } catch (e) {
            console.log(`Job ${name} Completion ERROR`, e);
        }
    })
    //process the job
    queue.process(name, async (job, done) => {
        //Delete from s3 bucket
        try {
            const params = {
                Bucket: data.bucket,
                Key: data.name
            };
            const result = await s3.delete(params);
            done(null, result); //pass it on to 'complete' event
        } catch (e) {
            console.log(`Queue ${name} Process ERROR`, e);
        }
    });
}