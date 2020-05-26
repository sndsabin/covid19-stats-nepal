require('dotenv').config()

// Default database configuration
var connection = {
  port: process.env.DB_PORT,
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  timezone: process.env.TIMEZONE || 'UTC',
  charset: 'utf8'
}

// sqlite
if (process.env.DB_CLIENT === 'sqlite') {
  connection = {
    filename: process.env.DB_DATABASE
  }
}

// postgre sql with connection string
if (process.env.DB_CLIENT === 'pg' && process.env.PG_CONNECTION_STRING) {
  connection = process.env.PG_CONNECTION_STRING
}

module.exports = {
  client: process.env.DB_CLIENT,
  useNullAsDefault: process.env.DB_CLIENT === 'sqlite' ? true : null,
  connection: connection,
  migrations: {
    tableName: 'migrations',
    directory: './database/migrations'
  },
  seeds: {
    directory: './database/seeds'
  }
}
