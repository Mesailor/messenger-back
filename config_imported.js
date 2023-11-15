const config = require('config');

const port = config.get('port') || 5000;

const dbConfig = {
    host: config.get('dbConfig.host')
}

const configKeys = {
    jwtPrivateKey: config.get('jwtPrivateKey')
}

module.exports = {
    port,
    dbConfig,
    configKeys
}