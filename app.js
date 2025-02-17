import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import CustomerRoutes from './src/routes/CustomerRoutes.js';
import UserRoutes from './src/routes/UserRoutes.js';
import TokenRoutes from './src/routes/TokenRoutes.js';
import PizzaRoutes from './src/routes/PizzaRoutes.js';

import './src/database';

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
    this.app.use('/customers/', CustomerRoutes);
    this.app.use('/tokens/', TokenRoutes);
    this.app.use('/pizzas/', PizzaRoutes);
  }
}

export default new App().app;
