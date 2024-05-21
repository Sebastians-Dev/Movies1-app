const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Genres = sequelize.define('genres', {
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
});

module.exports = Genres;