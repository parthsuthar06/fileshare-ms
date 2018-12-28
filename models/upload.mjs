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
import { unquoted } from '../helpers/queueJobAndProcess'

const DataTypes = Sequelize.DataTypes;
const sequelize = new DB(global.config.db);

const UploadModel = sequelize.dbInstance.define('upload', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    bucket: Sequelize.STRING,
    name: Sequelize.STRING,
    url: Sequelize.STRING
});
/**
 * create Table if not exist
 */
UploadModel.sync();

export default class Upload {
    /**
     * if not exist then only create
     */
    create(data) {
        if (data.id) {
            data.id = unquoted(data.id);
        }
        return this.get(data.id).then(d => {
            if (!d) {
                return UploadModel.create(data)
                    .then(this.getJSON);
            }
            throw new Error('Data Already exist');
        })
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
        if (model)
            return model.get({ plain: true })
        return null
    }
}