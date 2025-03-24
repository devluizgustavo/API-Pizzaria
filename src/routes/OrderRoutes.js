import { Router } from "express";
import OrderController from "../controllers/OrderController";
import ProductionController from '../controllers/ProductionController';
import loginRequired from "../middleware/loginRequired";
import DeliveryController from "../controllers/DeliveryController";
const router = new Router();

// Rotas de pedidos
router.get("/", loginRequired, OrderController.index);
router.get("/:idOrder", loginRequired, OrderController.show);
router.post("/:idCustomer", loginRequired, OrderController.store);
router.delete("/:idOrder/", loginRequired, OrderController.delete);

// Rotas de produção
router.get("/production/all", loginRequired, ProductionController.index);
router.get("/:idOrder/production/", loginRequired, ProductionController.show);
router.put("/:idOrder/production/", loginRequired, ProductionController.update);
router.post("/:idOrder/production/", loginRequired, ProductionController.store);

// Rotas de entrega
router.get("/delivery/all", DeliveryController.index);
router.get("/:idOrder/delivery/", DeliveryController.show);
router.put("/:idOrder/delivery/", DeliveryController.update);
router.post("/:idOrder/delivery/", DeliveryController.store);

export default router;
