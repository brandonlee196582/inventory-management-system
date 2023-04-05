/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('item', table => {
    table.increments('id');
    table.integer('user_id');
    table.foreign('user_id').references("id").inTable("user");
    table.string('item_name');
    table.string('description');
    table.string('quantity')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .alterTable("item", table =>{
        table.dropForeign("user_id");
        table.dropColumn("user_id");
    })
    .then(() => {
        return knex.schema.dropTableIfExists('item');
    })
};
