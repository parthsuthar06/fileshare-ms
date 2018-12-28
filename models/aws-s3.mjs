'use strict';
import dotenv from 'dotenv';
import AWS from 'aws-sdk';
import fs from 'fs';

const fsp = fs.promises;

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
        ETag: "String",
        Location: upload file url,
        Key: filename,
        Bucket: Bucket name 
     }
     * @param params --> see getParams()
     */
    upload(params) {
        return this.s3Client.upload(params).promise()
    }
    /**
     * self explanatory
     */
    async getParams({ path, name, type }) {
        const body =  await fsp.readFile(path);
        return {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: name,
            Body: body,
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
        return this.s3Client.deleteObject(params).promise()
    }
}