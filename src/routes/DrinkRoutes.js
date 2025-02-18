import { Router } from "express";
import DrinkController from "../controllers/DrinkController";
import loginRequired from '../middleware/loginRequired';
const router = new Router();

router.get('/', DrinkController.index);
router.get('/:id', DrinkController.show);
router.put("/:id", DrinkController.update);
router.post("/", DrinkController.store);
router.delete("/:id", DrinkController.delete);

export default router;
