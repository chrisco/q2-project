var knex = require('./knex');

module.exports = {
    Contributor: {
        findContributorByEmail: email => knex('contributor').where('email', email).returning('id').first(),
        findContributorById: id => knex('contributor').where('id', id).first(),
        createContributor: body => knex('contributor').insert(body, 'id')
    },
    Favorite: {

    },
    Location: {

    },
    Neighborhood: {

    },
    HappyHour: {

    }
};
