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
            fullName: DataTypes.STRING,
            phoneNumberPatient: DataTypes.STRING,
            addressPatient: DataTypes.STRING,
            gender: DataTypes.STRING,
            birthDate: DataTypes.STRING,
            status: DataTypes.STRING,
            date: DataTypes.STRING,
            description: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Booking',
        },
    );
    return Booking;
};
