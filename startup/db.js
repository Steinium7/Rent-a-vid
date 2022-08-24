const winston = require('winston');
const config = require('config');
const mongoose = require('mongoose');

module.exports = function () {
    if (config.get('Local'))
        mongoose
            .connect('mongodb://localhost/rent-a-vid')
            .then(() => winston.info('Connected to Database.'));
    else
        mongoose
            .connect('mongodb://localhost/rent-a-vid')
            .then(() => winston.info('Connected to Database.'));
};
