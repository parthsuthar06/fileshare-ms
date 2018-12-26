'use strict';
import express from 'express';
import { router as upload } from './upload';

const router = express.Router();

router.use('/upload', upload);

export { router };