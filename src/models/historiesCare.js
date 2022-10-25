'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HistoriesCare extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            HistoriesCare.belongsTo(models.Booking, {
                foreignKey: 'bookingId',
                as: 'bookingData',
            });
            HistoriesCare.belongsTo(models.Schedule, {
                foreignKey: 'timeReExam',
                as: 'scheduleData',
            });
        }
    }
    HistoriesCare.init(
        {
            bookingId: DataTypes.INTEGER,
            description: DataTypes.STRING,
            timeReExam: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'HistoriesCare',
        },
    );
    return HistoriesCare;
};
