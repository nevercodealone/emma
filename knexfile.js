module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
        filename: './db.sqlite'
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
