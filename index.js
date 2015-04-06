'use strict';

var request    = require('request');

var spamcheck = {};

spamcheck.check = function (opts, cb) {
	opts = opts || {options: 'short'};

	var self = this;

	request.post({
		url: 'http://spamcheck.postmarkapp.com/filter',
		form: opts
	},
	function(err, httpResponse, body) {
		if(err) {
			throw err;
		}
		body = JSON.parse(body);

		var info = {};
		info.score = body.score;
		info.scoreDescription = self.scoreDescription(body.score);

		if(body.report) {
			info.report = body.report;
		}

		cb(info);
	});
};

spamcheck.scoreDescription = function(score) {
	var roundedScore = Math.floor(score);
	var scoreDescription;
	if (roundedScore <= 0) {
		scoreDescription = 'Excellent';
	} else if (roundedScore > 0 && roundedScore < 5) {
		scoreDescription = 'Good';
	} else {
		scoreDescription = 'Spam';
	}
	return scoreDescription;
}


module.exports = spamcheck;
