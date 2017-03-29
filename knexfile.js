module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host     : process.env.db_host,
      user     : process.env.db_user,
      password: process.env.db_password,
      port    : 3306,
      database : 'tafelemma',
      charset  : 'utf8'
    }
  },
  production: {
    client: 'mysql',
    connection: {
      host     : process.env.db_host,
      user     : process.env.db_user,
      password: process.env.db_password,
      port    : 3306,
      database : 'tafelemma',
      charset  : 'utf8'
    }
  }
}
