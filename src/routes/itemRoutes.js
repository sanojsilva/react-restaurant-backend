const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.post("/add", itemController.addItem);
router.get("/all", itemController.getAllItems);
router.get("/orders", itemController.getOrders);
router.get("/:id", itemController.getItem);
router.put("/edit/:id", itemController.editItem);
router.post("/place-order", itemController.placeOrder);
router.post("/order-complete/:id", itemController.completeOrder);

module.exports = router;
