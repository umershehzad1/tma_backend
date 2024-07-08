'use strict'
require('dotenv').config();
module.exports = {

    /*
    |--------------------------------------------------------------------------
    | Default Database Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the database connections below you wish
    | to use as your default connection for all database work. Of course
    | you may use many connections at once using the Database library.
    |
    */

    'default' : process.env.DB_CONNECTION || 'postgres',

    /*
    |--------------------------------------------------------------------------
    | Database Connections
    |--------------------------------------------------------------------------
    |
    | Here are each of the database connections setup for your application.
    | Of course, examples of configuring each database platform that is
    | supported by Laravel is shown below to make development simple.
    |
    |
    | All database work in Laravel is done through the PHP PDO facilities
    | so make sure you have the driver for your particular database of
    | choice installed on your machine before you begin development.
    |
    */

    /*
    |--------------------------------------------------------------------------
    | Postgres Databases
    |--------------------------------------------------------------------------
    |
    | Postgres is an open source, fast, and advanced key-value store that also
    | provides a richer set of commands than a typical key-value systems
    | such as APC or Memcached. Framwork makes it easy to dig right in.
    |
    */

    "development": {

        "username": process.env.DB_USERNAME || "root",
        "password": process.env.DB_PASSWORD || null,
        "database": process.env.DB_DATABASE || "postgres",
        "host": process.env.DB_HOST || "127.0.0.1",
        "port": process.env.DB_PORT || 5432,
        "dialect": process.env.DB_CONNECTION || "postgres"
    },

    "test": {

        "username": process.env.DB_USERNAME || "root",
        "password": process.env.DB_PASSWORD || null,
        "database": process.env.DB_DATABASE || "postgres",
        "host": process.env.DB_HOST || "127.0.0.1",
        "port": process.env.DB_PORT || 5432,
        "dialect": process.env.DB_CONNECTION || "postgres"
    },

    "production": {

        "username": process.env.DB_USERNAME || "root",
        "password": process.env.DB_PASSWORD || null,
        "database": process.env.DB_DATABASE || "postgres",
        "host": process.env.DB_HOST || "127.0.0.1",
        "port": process.env.DB_PORT || 5432,
        "dialect": process.env.DB_CONNECTION || "postgres"
    },

}
