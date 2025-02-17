import { Router } from "express";
import PizzaController from "../controllers/PizzaController";
const router = new Router();

router.get('/', PizzaController.index);
router.get('/:id', PizzaController.show);
router.put("/:id", PizzaController.update);
router.post("/", PizzaController.store);
router.delete("/:id", PizzaController.delete);

export default router;
