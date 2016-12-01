module.exports = {
  cookieSecret: 'cookiemonster',
  mongo: {
    development: {
        connectionString: 'mongodb://admin:admin@ds115798.mlab.com:15798/blogdbssp'
    },
    production: {
        connectionString: 'mongodb://admin:admin@ds115798.mlab.com:15798/blogdbssp'
    }
  }
}
