'use strict';
import dotenv from 'dotenv';
import AWS from 'aws-sdk';
import fs from 'fs';
//load env var
dotenv.config();

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
});
//for singleton
let s3Instance;

export default class AWSS3 {
    constructor() {
        if (!s3Instance) {
            s3Instance = new AWS.S3()
        }
        this.s3Client = s3Instance;
    }
    /**
     * returns {
        ETag: 'String',
        Location: upload file url,
        Key: filename,
        Bucket: Bucket name 
     }
     * @param params --> see getParams()
     */
    upload(params) {
        return this.s3Client.upload(params).promise()
    }

    getParams({ path, name, type }) {
        return {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: name,
            Body: fs.readFileSync(path), //TO_DO create read stream 
            ACL: 'public-read',
            ContentType: type
        }
    }
    /**
     * params = {
        Bucket: "examplebucket", 
        Key: "objectkey.jpg"
     }
     * @param params 
     */
    delete(params) {
        return this.s3Client.delete(params).promise()
    }
}