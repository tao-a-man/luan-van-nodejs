'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Manager extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Manager.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'userData',
            });
            Manager.belongsTo(models.PhoneNumber, {
                foreignKey: 'userId',
                targetKey: 'userId',
                as: 'phone',
            });
            Manager.belongsTo(models.MarkdownDoctor, {
                foreignKey: 'userId',
                targetKey: 'doctorId',
                as: 'markdownData',
            });
            Manager.belongsTo(models.Specialist, {
                foreignKey: 'specialistId',
                as: 'specialistData',
            });
        }
    }
    Manager.init(
        {
            userId: DataTypes.INTEGER,
            roleId: DataTypes.STRING,
            price: DataTypes.STRING,
            specialistId: DataTypes.INTEGER,
            addressClinic: DataTypes.STRING,
            nameClinic: DataTypes.STRING,
            image: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Manager',
        },
    );
    return Manager;
};
