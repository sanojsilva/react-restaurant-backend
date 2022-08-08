const itemService = require("../services/itemService");

const addItem = async (req, res) => {
  const { name, price, image } = req.body;
  await itemService.addItem(name, price, image);
  return res.sendStatus(200);
};

const getAllItems = async (req, res) => {
  const items = await itemService.getItems();
  res.json(items);
};

const getItem = async (req, res) => {
  const item = await itemService.getItem(req.params.id);
  res.json(item);
};

const editItem = async (req, res) => {
  const { name, price, image } = req.body;
  await itemService.editItem(req.params.id, name, price, image);
  return res.sendStatus(200);
};

const placeOrder = async (req, res) => {
  const { items } = req.body;
  await itemService.placeOrder(items);
  return res.sendStatus(200);
};

const getOrders = async (req, res) => {
  const orders = await itemService.getOrders();
  res.json(orders);
};

const completeOrder = async (req, res) => {
  const orderId = req.params.id;
  await itemService.completeOrder(orderId);
  return res.sendStatus(200);
};

module.exports = {
  addItem,
  getAllItems,
  getItem,
  editItem,
  placeOrder,
  getOrders,
  completeOrder,
};
