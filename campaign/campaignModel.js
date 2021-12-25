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
    return db('user').insert(creds, "id")
}

function findAll() {
    return db('user')
}

function findById(id) {
    return db('user').where({ id })
}

function findByName(name) {
    return db('user').where({ name })
}

function update(updates, id) {
    return db('user').where({ id }).update(updates)
}

function remove(id) {
    return db('user').where({ id }).del()
}