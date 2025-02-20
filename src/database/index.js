import { Sequelize } from "sequelize";
import database from '../config/database';

import Address from '../models/Address';
import Customer from '../models/Customer';
import Contact from "../models/Contact";
import User from "../models/User";
import Pizza from "../models/Pizza";
import Drink from "../models/Drink";
import Order from "../models/Order";
import OrderPizza from '../models/OrderPizza'
import OrderDrink from "../models/OrderDrink";

const models = [Address, Customer, Contact, User, Pizza, Drink, Order, OrderPizza, OrderDrink];

const connection = new Sequelize(database);

models.forEach(model => model.init(connection));
models.forEach(model => model.associate && model.associate(connection.models));
