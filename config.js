if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config({ path: '.env' });
}

module.exports = {
	PREFIX: process.env.PREFIX || '!',
	OWNER_ID: process.env.OWNER_ID || 'not set',
	STRIK3R_ID: process.env.STRIK3R_ID,
	STRIK3R_TOKEN: process.env.STRIK3R_TOKEN,
	PUBLIC_KEY: process.env.PUBLIC_KEY || 'not set',
	SERVER_ID: process.env.SERVER_ID,
};