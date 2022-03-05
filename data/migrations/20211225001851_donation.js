
exports.up = function(knex) {
    return knex.schema.createTable('donation', tbl => {
        tbl.increments();
        tbl.integer('campaign_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('campaign')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('user')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
        tbl.integer('amount')
            .unsigned()
            .notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('donation')
};
