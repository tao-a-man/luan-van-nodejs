'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    }
    Booking.init(
        {
            userId: DataTypes.INTEGER,
            doctorId: DataTypes.INTEGER,
            status: DataTypes.STRING,
            date: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'Booking',
        },
    );
    return Booking;
};
