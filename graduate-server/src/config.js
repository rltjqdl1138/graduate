const CONFIG = {};
CONFIG.app = process.env.NODE_ENV || 'local';
CONFIG.app_name = 'OpenAvatar';
CONFIG.scheme = process.env.SCHEME || 'http';
CONFIG.host = process.env.HOST || 'localhost';
CONFIG.port = process.env.PORT || '3000';
CONFIG.kafka_url = process.env.KAFKA_URL || '192.168.0.52:9092';
module.exports = CONFIG;
