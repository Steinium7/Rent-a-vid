const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')();
if (app.get('env') == 'production') {
    require('./startup/db')();
    require('./startup/prod')(app);
}
require('./startup/routes')(app);
require('./startup/config')();
require('./startup/validation')();

port = process.env.PORT || 3000;
if (app.get('env') == 'production')
    app.listen(port, () => {
        winston.info(`Listening on Port ${port}`);
    });

module.exports = app;
