import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import UserRoutes from './routes/UserRoutes.js';
import TokenRoutes from './routes/TokenRoutes.js';
import PizzaRoutes from './routes/PizzaRoutes.js';
import DrinkRoutes from './routes/DrinkRoutes.js';
import OrderRoutes from './routes/OrderRoutes.js';
import CustomerRoutes from './routes/CustomerRoutes.js';

import './database/index.js';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/users/', UserRoutes);
    this.app.use('/tokens/', TokenRoutes);
    this.app.use('/pizzas/', PizzaRoutes);
    this.app.use('/drinks/', DrinkRoutes);
    this.app.use('/orders/', OrderRoutes);
    this.app.use('/customers/', CustomerRoutes);
  }
}

export default new App().app;
