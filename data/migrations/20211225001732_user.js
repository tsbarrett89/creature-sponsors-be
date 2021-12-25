
exports.up = function(knex) {
  return knex.schema.createTable('user', tbl => {
        tbl.increments();
        tbl.string('email')
            .notNullable()
            .unique();
        tbl.string('password')
            .notNullable();
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user')
};
