import { Router } from "express";
import PizzaController from "../controllers/PizzaController";
import loginRequired from '../middleware/loginRequired';
const router = new Router();

router.get('/', PizzaController.index);
router.get('/:id', PizzaController.show);
router.put("/:id", loginRequired, PizzaController.update);
router.post("/", loginRequired, PizzaController.store);
router.delete("/:id", loginRequired, PizzaController.delete);

export default router;
