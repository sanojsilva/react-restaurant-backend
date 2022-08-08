const db = require("../db");
const shortid = require("shortid");

const addItem = async (name, price, image) => {
  await db.raw("insert into item(name, price, image) values(?, ?, ?)", [
    name,
    price,
    image,
  ]);
};

const editItem = async (id, name, price, image) => {
  await db.raw("update item set name = ?, price = ?, image = ? where id = ?", [
    name,
    price,
    image,
    id,
  ]);
};

const getItems = async () => {
  const items = await db.raw("select * from item");
  return items;
};

const getItem = async (id) => {
  const item = await db.raw("select * from item where id = ?", [id]);
  return item[0];
};

const placeOrder = async (items) => {
  const code = shortid.generate();
  let total = 0;
  items.forEach((item) => {
    total += item.price * item.qty;
  });
  const order = await db.raw(
    "insert into order_main(code, total, complete) values(?, ?, ?) returning *",
    [code, total, false]
  );
  const orderId = order[0].id;
  for (const item of items) {
    await db.raw(
      "insert into order_item(orderid, itemid, qty) values(?, ?, ?)",
      [orderId, item.id, item.qty]
    );
  }
  return true;
};

const getOrders = async () => {
  const orders = await db.raw(
    "select om.id, om.code, om.total, om.complete, i.name, oi.qty from order_main om, order_item oi, item i where om.id = oi.orderid and oi.itemid = i.id"
  );
  const newOrders = [];
  orders.forEach((order) => {
    const orderFound = newOrders.find((no) => no.id === order.id);
    if (!orderFound) {
      const or = {
        id: order.id,
        code: order.code,
        total: order.total,
        complete: order.complete,
        items: [],
      };
      newOrders.push(or);
    }
  });
  orders.forEach((o) => {
    const item = {
      name: o.name,
      qty: o.qty,
    };
    const orderFound = newOrders.find((no) => no.id === o.id);
    newOrders[newOrders.indexOf(orderFound)].items.push(item);
  });
  return newOrders;
};

const completeOrder = async (orderId) => {
  await db.raw("update order_main set complete = true where id = ?", [orderId]);
};

module.exports = {
  addItem,
  editItem,
  getItems,
  getItem,
  placeOrder,
  getOrders,
  completeOrder,
};
