/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("order_main", (table) => {
      table.increments("id").notNullable().primary();
      table.string("code", 255);
      table.boolean("complete");
      table.decimal("total", 2);
    })
    .createTable("order_item", (table) => {
      table.increments("id").notNullable().primary();
      table.int("orderid").references("id").inTable("order_main");
      table.int("itemid").references("id").inTable("item");
      table.decimal("qty", 0);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("order_main").dropTable("order_item");
};
