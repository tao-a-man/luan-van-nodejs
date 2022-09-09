'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HistoriesOrder extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    }
    HistoriesOrder.init(
        {
            userId: DataTypes.INTEGER,
            orderId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'HistoriesOrder',
        },
    );
    return HistoriesOrder;
};
