const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'node-complete',
    'root',
    '111',
    {dialect: 'mysql', host: 'localhost'}
);

module.exports = sequelize;