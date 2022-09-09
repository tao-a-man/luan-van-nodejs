'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OrderDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         *
         */
        static associate(models) {}
    }
    OrderDetail.init(
        {
            orderId: DataTypes.INTEGER,
            productId: DataTypes.INTEGER,
            price: DataTypes.INTEGER,
            amount: DataTypes.INTEGER,
            total: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'OrderDetail',
        },
    );
    return OrderDetail;
};
