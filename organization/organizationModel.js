const db = require('../data/dbConfig.js');

module.exports = {
    add,
    findAll,
    findById,
    findByEmail,
    update,
    remove
}

function add(creds) {
    return db('organization').insert(creds, "id")
}

function findAll() {
    return db('organization')
}

function findById(id) {
    return db('organization').where({ id })
}

function findByEmail(email) {
    return db('organization').where({ email })
}

function update(updates, id) {
    return db('organization').where({ id }).update(updates)
}

function remove(id) {
    return db('organization').where({ id }).del()
}