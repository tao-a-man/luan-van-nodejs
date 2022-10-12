module.exports = {
    up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn(
                'Bookings', // table name
                'scheduleId', // new field name
                {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
            ),
            // queryInterface.addColumn(
            //     'Bookings', // table name
            //     'phoneNumberPatient', // new field name
            //     {
            //         type: Sequelize.STRING,
            //         allowNull: true,
            //     },
            // ),
            // queryInterface.addColumn(
            //     'Bookings', // table name
            //     'addressPatient', // new field name
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
