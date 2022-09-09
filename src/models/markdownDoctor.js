'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MarkdownProduct extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         *
         */
        static associate(models) {}
    }
    MarkdownProduct.init(
        {
            productId: DataTypes.INTEGER,
            contentHTML: DataTypes.TEXT,
            contentMarkdown: DataTypes.TEXT,
            description: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'MarkdownProduct',
        },
    );
    return MarkdownProduct;
};
