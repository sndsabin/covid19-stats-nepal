exports.up = function(knex) {
  return knex.schema.createTable("stats", function(table) {
    table.increments();
    table.integer("death").unsigned();
    table.integer("recovered").unsigned();
    table.integer("isolation").unsigned();
    table.integer("quarrentine").unsigned();
    table.integer("pcr_positive").unsigned();
    table.integer("pcr_negative").unsigned();
    table.integer("pcr_sample_tested").unsigned();
    table.integer("rdt_sample_tested").unsigned();
    table.dateTime("last_updated_at").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("stats");
};
