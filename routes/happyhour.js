var express = require('express');
var knex = require('../db/knex');
var router = express.Router();
var db = require('../db/api');
require('dotenv').config();

router.get('/:id', function(req, res, next) {
	console.log(req.params.id, 'rec.params.id');
	knex('location').where({
			id: req.params.id
		}).first()
		.then(record => {
      console.log(record, 'record');
      return knex('happy_hour').where({
				'location_id': record.id
			});
      console.log(record.id, 'location id');
		})
		.then(data => {
      console.log(data, 'the data!');
      res.render('happyhour', {
				name: data[0].name,
				address: data[0].address,
        url: data[0].url,
        image_url: data[0].image_url,
        neighborhood_name: data[0].neighborhood_name,
        happy_hours: data[1],
        api: process.env.GOOGLE_API_KEY // In case we want a map on this page.
			});
		});
});


module.exports = router;
