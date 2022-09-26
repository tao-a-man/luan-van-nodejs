module.exports = {
    up(queryInterface, Sequelize) {
        return Promise.all([
            // queryInterface.addColumn(
            //     'Managers', // table name
            //     'position', // new field name
            //     {
            //         type: Sequelize.STRING,
            //         allowNull: true,
            //     },
            // ),
            // queryInterface.addColumn(
            //     'Managers', // table name
            //     'regions', // new field name
            //     {
            //         type: Sequelize.STRING,
            //         allowNull: false,
            //     },
            // ),
        ]);
    },

    down(queryInterface, Sequelize) {
        // logic for reverting the changes
        return Promise.all([
            // queryInterface.removeColumn('Users', 'linkedin'),
            // queryInterface.removeColumn('Users', 'twitter'),
            // queryInterface.removeColumn('Users', 'bio'),
        ]);
    },
};
