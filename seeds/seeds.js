/*
===========================
2016-06-27 at 10:00 PM
===========================
Work in progress. Haven't tested yet.
Will be a miracle if it works out of the box.
*/

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('happy_hour').del()
		.then(function() {
			return knex('favorite').del();
		})
		.then(function() {
			return knex('location').del();
		})
		.then(function() {
			return knex('neighborhood').del();
		})
		.then(function() {
			return knex('contributor').del();
		})
		.then(function() {
			return Promise.all([
				// Inserts seed entries
				knex('contributor').insert({
					email: 'foo@bar.com', // Validation? Sanitization? Of "ALL" fields??
					password: 'foobar',
					isAdmin: false
				}),
				knex('contributor').insert({
					email: 'foo2@bar.com',
					password: 'foo2bar',
					isAdmin: true
				}),
				knex('neighborhood').insert({
					name: 'LoHi',
					image_url: 'http://lizrichardsrealestate.com/wp-content/uploads/2014/02/lohi_lrg.jpg'
				}),
				knex('neighborhood').insert({
					name: 'LoHi2',
					image_url: 'http://lizrichardsrealestate.com/wp-content/uploads/2014/02/lohi_lrg.jpg'
				})
			]);
		})
		.then(function() {
			return Promise.all([
				knex('contributor').select(),
				knex('neighborhood').select()
			]);
		})
		.then(function(data) {
			return Promise.all([
					knex('location').insert({
						name: 'Brider',
						address: '1644 Platte St, Denver, CO 80202', // What format do we want this? Validation?
						url: 'http://denverbrider.com', // What format do we want this? Validation?
						image_url: 'http://ecospace.com/wp-content/uploads/2015/12/IMG_0324.jpg', // Validation?
						contributor_id: findEmail('foo@bar.com', data[1]),
						neighborhood_name: findNeighborhood('LoHi', data[1])
					}),
					knex('location').insert({
						name: 'Brider2',
						address: '1644 Platte St, Denver, CO 80202',
						url: 'http://denverbrider.com',
						image_url: 'http://ecospace.com/wp-content/uploads/2015/12/IMG_0324.jpg',
						contributor_id: findEmail('foo2@bar.com', data[1]),
						neighborhood_name: findNeighborhood('LoHi2', data[1])
					})
				])
				.then(function() {
					return data;
				});
		})
		.then(function() {
			return Promise.all([
				knex('contributor').select(),
				knex('location').select()
			]);
		})
		.then(function(data) {
			return Promise.all([
					knex('favorite').insert({
						location_id: findLocation('Brider', data[1]),
						contributor_id: findEmail('foo@bar.com', data[0])
					}),
					knex('favorite').insert({
						location_id: findLocation('Brider2', data[1]),
						contributor_id: findEmail('foo2@bar.com', data[0])
					})
				]),
				knex('happy_hour').insert({
					day: 'monday',
					start: '4:00 PM', // What format do we want times? Validation?
					end: '7:00 PM',
					location_id: findLocation('Brider', data[1]),
					contributor_id: findEmail('foo@bar.com', data[0])
				}),
				knex('happy_hour').insert({
					day: 'monday',
					start: '4:30 PM',
					end: '6:30 PM',
					location_id: findLocation('Brider2', data[1]),
					contributor_id: findEmail('foo2@bar.com', data[0])
				})
				.then(function() {
					return data; // Necessary? (If not, remove.)
				});
		});
};

// These three functions could be refactored into a single generic function.
function findEmail(email, list) {
	for (var i = 0; i < list.length; i++) {
		if (email === list[i].email) {
			return list[i].id;
		}
	}
}

function findNeighborhood(name, list) {
	for (var i = 0; i < list.length; i++) {
		if (name === list[i].name) {
			return list[i].id;
		}
	}
}

function findLocation(name, list) {
	for (var i = 0; i < list.length; i++) {
		if (name === list[i].name) {
			return list[i].id;
		}
	}
}
