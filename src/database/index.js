import { Sequelize } from "sequelize";
import database from '../config/database';

import Address from '../models/AddressModel';
import Client from '../models/ClientModel';

const models = [Address, Client]

const connection = new Sequelize(database);

models.forEach(model => model.init(connection));
models.forEach(model => model.associate && model.associate(connection.models));
