'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         *
         * name: {
                type: Sequelize.STRING,
            },
            commodities: {
                type: Sequelize.STRING,
            },
            price: {
                type: Sequelize.INTEGER,
            },
            amount: {
                type: Sequelize.INTEGER,
            },
            image: {
                type: Sequelize.BLOB('long'),
            },
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
