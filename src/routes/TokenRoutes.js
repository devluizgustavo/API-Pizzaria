import { Router } from "express";
import TokenController from "../controllers/TokenController.js";
const router = new Router();

// Rotas da criação de um token

router.post("/", TokenController.store);

export default router;


