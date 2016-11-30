module.exports = {
  cookieSecret: 'cookiemonster',
  mongo: {
    development: {
        connectionString: 'mongodb://youruser:yourpassword@ds027425.mlab.com:27425/project-7'
    },
    production: {
        connectionString: 'mongodb://youruser:yourpassword@ds027425.mlab.com:27425/project-7'
    }
  }
}
