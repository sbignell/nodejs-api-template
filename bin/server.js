var log = require('../util/log').logger,
	config = require('config'),
	mongoose = require('mongoose'),
	app = require('../app');


//
// MongoDB
//
var env = process.env.NODE_ENV || 'dev';
if (env === 'dev') {
	log.info('[dev] Setting MongoDB in debug mode');
	mongoose.set('debug', true);
}

log.info('Connecting to MongoDB...');
mongoose.connect(config.get('db.conn'), function (err) {
	if (err) throw err;
	log.info('Connected to MongoDB');

	mongoose.connection.on('error', function (err) {
		log.error(err);
	});

	//
	// Init
	//
	var port = process.env.PORT || config.get('port');
	app.listen(port);
	log.info('Server running at port ' + port);
});