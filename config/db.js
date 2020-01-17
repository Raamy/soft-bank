const { Pool } = require('pg');
const pool = new Pool ({
	host: 'localhost',
	port: '5432',
	user: 'postgres',
	database: 'softBank',
	password: 'Bloblo77'
});

pool.connect(error => {
	if(error){
		console.error('Database : Error -', error.stack); 
	}
	else{
		console.log('Database : OK');
	}
});

module.exports = { pool }; 