var knex = require('./knex');

module.exports = {
    Contributor: {
        getContributorById: id => knex('contributor').where('id', id).first(),
        findContributorByEmail: email => knex('contributor').where('email', email).first(),
        addContributor: body => knex('contributor').insert(body).returning('*').first()
    },
    Favorite: {

    },
    Location: {

    },
    Neighborhood: {
      knex('neighborhood').
    },
    HappyHour: {

    }
};
