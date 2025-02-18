import { Router } from "express";
import DrinkController from "../controllers/DrinkController";
import loginRequired from '../middleware/loginRequired';
const router = new Router();

router.get('/', DrinkController.index);
router.get('/:id', DrinkController.show);
router.put("/:id", loginRequired, DrinkController.update);
router.post("/", loginRequired, DrinkController.store);
router.delete("/:id", loginRequired, DrinkController.delete);

export default router;
