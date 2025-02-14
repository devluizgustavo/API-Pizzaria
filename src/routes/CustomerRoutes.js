import { Router } from "express";
import CustomerController from "../controllers/CustomerController.js";
import loginRequired from "../middleware/loginRequired.js";
const router = new Router();

// Rotas da criação de um cliente
router.get("/", loginRequired, CustomerController.index);
router.get("/:id", loginRequired, CustomerController.show);
router.post("/", loginRequired, CustomerController.store);
router.put("/:id", loginRequired, CustomerController.update);
router.delete("/:id", loginRequired, CustomerController.delete);

export default router;


