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
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    bucket: Sequelize.STRING,
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    url: Sequelize.STRING,
    etag: Sequelize.STRING,
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
        return this.get("name",data.name).then(d => {
            if (!d) {
                return UploadModel.create(data)
                    .then(this.getJSON);
            }
            throw new Error('Duplicate File Name Exist!');
        })
    }

    get(key,val) {
        return UploadModel.findOne({ where: { [key]:val } })
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