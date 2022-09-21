const winston = require('winston')
const config = require('config')

module.exports = function(){
    if(!config.get('jwtKey')){
        winston.info("ERROR, JWTKEY not set ...");
        process.exit(1);
    }    
}
