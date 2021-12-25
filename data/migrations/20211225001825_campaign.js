
exports.up = function(knex) {
    return knex.schema.createTable('campaign', tbl => {
        tbl.increments();
        tbl.integer('org_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('organization')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
        tbl.string('name')
            .notNullable()
            .unique()
        tbl.string('animal')
            .notNullable()
        tbl.string('location')
            .notNullable()
        tbl.integer('funding_goal')
            .notNullable()
        tbl.integer('amount_funded')
            .defaultTo(0)
        tbl.string('description_short')
            .defaultTo('')
        tbl.text('description_long')
            .notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('campaign');
};
