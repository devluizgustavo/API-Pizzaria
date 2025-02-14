import { Router } from "express";
import CustomerController from "../controllers/CustomerController.js";
import AddressController from "../controllers/AddressController.js";
import loginRequired from "../middleware/loginRequired.js";
const router = new Router();

// Rotas da criação de um cliente
router.get("/", loginRequired, CustomerController.index);
router.get("/:id", loginRequired, CustomerController.show);
router.post("/", loginRequired, CustomerController.store);
router.put("/:id", loginRequired, CustomerController.update);
router.delete("/:id", loginRequired, CustomerController.delete);

// Rotas de endereço do cliente
router.get("/:idCustomer/address", loginRequired, AddressController.index);
router.get("/:idCustomer/address/:zipCode",loginRequired, AddressController.show);
router.post("/:idCustomer/address/",loginRequired, AddressController.store);
router.put("/:idCustomer/address/:idAddress", loginRequired, AddressController.update);
router.delete("/:idCustomer/address/:idAddress", loginRequired, AddressController.delete);


export default router;


