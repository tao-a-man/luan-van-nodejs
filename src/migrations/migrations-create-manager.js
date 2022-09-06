'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Managers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                type: Sequelize.INTEGER,
            },
            roleId: {
                type: Sequelize.STRING,
            },
            roleId: {
                type: Sequelize.STRING,
            },
            addressClinic: {
                type: Sequelize.STRING,
            },
            nameClinic: {
                type: Sequelize.STRING,
            },
            image: {
                type: Sequelize.BLOB('long'),
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Managers');
    },
};
