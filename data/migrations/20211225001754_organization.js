
exports.up = function(knex) {
    return knex.schema.createTable('organization', tbl => {
        tbl.increments();
        tbl.string('email')
            .notNullable()
            .unique();
        tbl.string('password')
            .notNullable();
        tbl.string('name')
            .notNullable()
            .unique();
        tbl.string('location')
            .notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('organization');
};
