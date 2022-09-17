'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         *
         */
        static associate(models) {
            User.belongsTo(models.Manager, {
                foreignKey: 'id',
                targetKey: 'userId',
                as: 'roleData',
            });
        }
    }
    User.init(
        {
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            firstName: DataTypes.STRING,
            age: DataTypes.INTEGER,
            gender: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
        },
    );
    return User;
};
