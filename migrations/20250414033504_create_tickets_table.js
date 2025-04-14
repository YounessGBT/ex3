// filepath: migrations/<timestamp>_create_tickets_table.js
exports.up = function (knex) {
    return knex.schema.createTable('tickets', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('description').notNullable();
      table.string('status').defaultTo('open');
      table.integer('userId').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('technicianId').unsigned().references('id').inTable('users').onDelete('SET NULL');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('closedAt').nullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('tickets');
  };