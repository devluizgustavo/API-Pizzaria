import { Router } from "express";
import CustomerController from "../controllers/CustomerController.js";
import AddressController from "../controllers/AddressController.js";
import ContactController from "../controllers/ContactController.js";
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

// Rotas de contatos do cliente
router.get("/:idCustomer/contacts/", loginRequired, ContactController.index);
router.get("/:idCustomer/contacts/:idContact", loginRequired, ContactController.show);
router.post("/:idCustomer/contacts/", loginRequired, ContactController.store);
router.put("/:idCustomer/contacts/:idContact", loginRequired, ContactController.update);
router.delete("/:idCustomer/contacts/:idContact", loginRequired, ContactController.delete);


export default router;


