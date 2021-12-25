const db = require('../data/dbConfig.js');

module.exports = {
    add,
    findAll,
    findById,
    findByName,
    findByLocation,
    findByAnimal,
    findByOrg,
    update,
    remove
}

function add(creds) {
    return db('campaign').insert(creds, "id")
}

function findAll() {
    return db('campaign')
}

function findById(id) {
    return db('campaign').where({ id })
}

function findByName(name) {
    return db('campaign').where({ name })
}

function findByLocation(location) {
    return db('campaign').where({ location })
}

function update(updates, id) {
    return db('campaign').where({ id }).update(updates)
}

function remove(id) {
    return db('campaign').where({ id }).del()
}