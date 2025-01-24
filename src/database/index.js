import { Sequelize } from 'sequelize';
import dbConfig from '../config/database.js';

import ClientModel from '../models/ClientModel.js';

const models = [ClientModel];

const connection = new Sequelize(dbConfig);

models.forEach(model => { model.init(connection) });
models.forEach(model => model.associate && model.associate(connection.models))



