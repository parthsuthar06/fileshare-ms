'use strict';
/**
 * controller imports
 */
import express from 'express';
import formidable from 'formidable';
import Upload from '../models/upload';
import { addJobAndProcess, deleteJobAndProcess } from '../helpers/queueJobAndProcess';
import { FILEUPLOAD, FILEDELETE } from '../config/constant';

const router = express.Router();

router.get('/all', async (req, res) => {
    const model = new Upload();
    const data = await model.getAll();
    res.status(200).json({
        responseCode: 0,
        data
    })
})
/**
 * returns {
        id : String,
        bucket : String,
        name : String,
        url : String,
        etag : String
    }
 */
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const model = new Upload();
    const result = await model.get("id",id);
    res.status(200).json({
        responseCode: 0,
        data: result
    })
})

router.post('/', (req, res) => {
    const form = new formidable.IncomingForm();
    form.on('file', (field, file) => {
        const data = {
            path: file.path,
            name: file.name,
            type: file.type
        }
        res.status(200).json({
            responseCode: 0,
            data: 'Added Into Queue For Upload'
        })
        addJobAndProcess(FILEUPLOAD, data);
    });
    form.parse(req);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    res.status(200).json({
        responseCode: 0,
        data: 'Added Into Queue For Delete'
    })
    const model = new Upload();
    const data = await model.get("id",id);
    deleteJobAndProcess(FILEDELETE, data);
})

export { router };