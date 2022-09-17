'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         *
         * =]
         */
        static associate(models) {}
    }
    Product.init(
        {
            name: DataTypes.STRING,
            commoditiesId: DataTypes.INTEGER,
            price: DataTypes.INTEGER,
            amount: DataTypes.INTEGER,
            image: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Product',
        },
    );
    return Product;
};
