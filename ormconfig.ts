require('dotenv').config();

module.exports = {
  'type': 'mysql',
  'synchronize': false,
  'logging': false,
  'seeds': ['dist/server/data/seeds/**/*.js'],
  'factories': ['dist/server/data/factories/**/*.js'],
  'entities': [
    'dist/server/data/models/**/*.js'
  ],
  'migrations': [
    'dist/server/data/migrations/**/*.js'
  ],
  'migrationsTableName': 'migrations',
  'subscribers': [
    'dist/server/data/subscribers/**/*.js'
  ],
  'cli': {
    'migrationsDir': 'src/server/data/migrations',
    'entitiesDir': 'src/server/data/models',
    'subscribersDir': 'src/server/data/subscribers'
  },
  'keepConnectionAlive': true,
  'bigNumberStrings': false,
  'extra': {
    'connectionLimit': 4
  },
  'host': process.env.DB_HOST,
  'username': process.env.DB_USER,
  'password': process.env.DB_PASSWORD,
  'database': process.env.DB_NAME,
  'port': process.env.DB_PORT
}