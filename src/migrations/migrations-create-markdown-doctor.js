'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('MarkdownDoctors', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            doctorId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Managers', // name of Target model
                    key: 'userId', // key in Target model that we're referencing
                },
                onDelete: 'CASCADE',
            },
            contentHTML: {
                type: Sequelize.TEXT,
            },
            contentMarkdown: {
                type: Sequelize.TEXT,
            },
            description: {
                type: Sequelize.TEXT,
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
        await queryInterface.dropTable('MarkdownDoctors');
    },
};
