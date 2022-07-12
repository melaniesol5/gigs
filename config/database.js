const Sequelize = require('sequelize');

module.exports = new Sequelize("gig", 'root', '', {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

});

//Test Database
