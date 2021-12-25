const db = require('../data/dbConfig.js');

module.exports = {
    add,
    findAll,
    findById,
    findByCampaign,
    findByUser,
    update,
    remove
}

function add(creds) {
    return db('donation').insert(creds, "id")
}

function findAll() {
    return db('donation')
}

function findById(id) {
    return db('donation').where({ id })
}

function findByCampaign(campaign_id) {
    return db('donation').where({ campaign_id })
}

function update(updates, id) {
    return db('donation').where({ id }).update(updates)
}

function remove(id) {
    return db('donation').where({ id }).del()
}