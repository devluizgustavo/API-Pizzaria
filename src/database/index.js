import { Sequelize } from "sequelize";
import database from '../config/database';

import Address from '../models/Address';
import Customer from '../models/Customer';
import Contact from "../models/Contact";
import User from "../models/User";

const models = [Address, Customer, Contact, User]

const connection = new Sequelize(database);

models.forEach(model => model.init(connection));
models.forEach(model => model.associate && model.associate(connection.models));
