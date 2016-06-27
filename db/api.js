var knex = require('./knex');

module.exports = {
    Contributor: {
        findUserByEmail: email =>
            knex('contributor').where('email', email).returning('id').first(),
        addContributor: body => knex('contributor').insert(body, 'id'),
        getContributor: id => knex('users').where('id', id).first(),
        findContributorById: id => knex('contributor').where('id', id).first()
    },
    Location: {
        findLocation
    }
}
