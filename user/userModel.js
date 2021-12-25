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
    return db('user').insert(creds, "id")
}

function findAll() {
    return db('user')
}

function findById(id) {
    return db('user').where({ id: id })
}

function findByEmail(email) {
    return db('user').where({ email: email })
}