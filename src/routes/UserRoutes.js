import { Router } from "express";
import UserController from "../controllers/UserController";
import loginRequired from "../middleware/loginRequired";
import isSelf from "../middleware/isSelf";
const router = new Router();

// Rotas de criação do usuário
//router.get("/", UserController.index);
router.get("/:id", loginRequired, isSelf, UserController.show);
router.post("/", UserController.store);
router.put("/:id", loginRequired, isSelf, UserController.update);
router.delete("/:id", loginRequired, isSelf, UserController.delete);

export default router;


