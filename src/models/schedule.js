'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Schedule.hasOne(models.Booking, {
                foreignKey: 'scheduleId',
                as: 'bookingData',
            });
            Schedule.hasOne(models.HistoriesCare, {
                foreignKey: 'timeReExam',
                as: 'historiesData',
            });
            Schedule.belongsTo(models.Allcode, {
                foreignKey: 'timeType',
                targetKey: 'keyMap',
                as: 'timeData',
            });
        }
    }
    Schedule.init(
        {
            isBooking: DataTypes.BOOLEAN,
            isDoing: DataTypes.BOOLEAN,
            date: DataTypes.DATE,
            timeType: DataTypes.STRING,
            doctorId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Schedule',
        },
    );
    return Schedule;
};
