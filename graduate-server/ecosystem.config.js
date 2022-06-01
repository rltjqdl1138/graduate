'use strict';
module.exports = {
  apps: [
    {
      name: 'graduate',
      script: './dist/www.js',
      watch: false,
      ignore_watch: ['[/\\]./', 'node_modules', 'logs', 'public'],
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'dev',
        instances: 1,
        SCHEME: 'http',
        HOST: '1.221.216.110',
        PORT: 8010,
        KAFKA_URL:'192.168.0.52:9092'
      },
      env_production: {
        NODE_ENV: 'prod',
        instances: 1,
        SCHEME: 'http',
        HOST: '1.221.216.110',
        PORT: 8010,
        KAFKA_URL:'172.27.0.23:9092'
      },
    },
  ],
};
