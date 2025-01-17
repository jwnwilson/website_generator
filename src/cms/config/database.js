module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        client: 'mongo',
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 27017),
        database: env('DATABASE_NAME', 'cms'),
        username: env('DATABASE_USERNAME', 'docker'),
        password: env('DATABASE_PASSWORD', 'docker'),
      },
      options: {
      },
    },
  },
});
