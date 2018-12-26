'use strict';
import express from 'express';
import formidable from 'formidable';
import Queue from '../models/queue';
import AWSS3 from '../models/aws-s3'

const router = express.Router();

router.post('/', (req, res) => {
    const FILEUPLOAD = 'fileUpload';
    const form = new formidable.IncomingForm();
    form.on('file', (field, file) => {
        const data = {
            path: file.path,
            name: file.name,
            type: file.type
        }
        queueJobAndProcess(FILEUPLOAD, data);

    });
    form.parse(req);
});

function queueJobAndProcess(name, data) {
    const queue = new Queue();
    const s3 = new AWSS3()
    //queue the job
    const job = queue.create(name, data).save();

    job.on('complete', (result) => {
        console.log(`Job completed with ${name} Queue`, result)
        //store the result into database

    })
    //process the job
    queue.process(name, (job, done) => {
        //upload to s3 bucker
        const params = s3.getParams(data);
        s3.upload(params)
            .then((result) => {
                // console.log('S3 res--->', result)
                done(null, result); //pass it on to 'complete' event
            })
            .catch((err) => {
                console.log('S3 err--->', err);
            });

    });
}
export { router };