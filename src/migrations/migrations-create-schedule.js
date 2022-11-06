'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Schedules', {
            id: {
                allowNull: false,
                autoIncrement: true,
                unique: true,
                type: Sequelize.INTEGER,
            },
            isBooking: {
                type: Sequelize.BOOLEAN,
            },
            isDoing: {
                type: Sequelize.BOOLEAN,
            },
            date: {
                type: Sequelize.DATE,
                primaryKey: true,
            },
            timeType: {
                type: Sequelize.STRING,
                primaryKey: true,
            },
            doctorId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
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
        await queryInterface.dropTable('Schedules');
    },
};
