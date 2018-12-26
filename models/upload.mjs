'use strict';
/**
 * TO_DO should be in app.mjs
 * app config
 */
import { config } from '../config/appConfig';
global.config = config;
/**
 * models imports
 */
import Sequelize from 'sequelize';
import DB from './db';

const DataTypes = Sequelize.DataTypes;
const sequelize = new DB(global.config.db);

const UploadModel = sequelize.dbInstance.define('upload', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    bucket: Sequelize.STRING,
    name: Sequelize.STRING,
    url: Sequelize.STRING,
    etag: Sequelize.STRING,
});
/**
 * create Table if not exist
 */
UploadModel.sync();

export default class Upload {
    create(data) {
        return UploadModel.create(data)
            .then(this.getJSON);
    }

    get(id) {
        return UploadModel.findOne({ where: { id } })
            .then(this.getJSON)
    }

    getAll() {
        return UploadModel.findAll();
    }

    delete(id) {
        return UploadModel.destroy({ where: { id } })
    }

    getJSON(model) {
        return model.get({ plain: true })
    }
}