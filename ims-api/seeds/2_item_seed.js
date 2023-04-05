/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item_table').del()
  await knex('item_table').insert([
    {user_id: 1, item_name: 'item 1', description: 'item1 description', quantity: 2},
    {user_id: 1, item_name: 'item 2', description: 'item2 description', quantity: 12},
    {user_id: 1, item_name: 'item 3', description: 'item3 description', quantity: 22}
  ]);
};
