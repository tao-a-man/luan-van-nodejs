'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MarkdownDoctor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         *
         */
        static associate(models) {
            MarkdownDoctor.hasOne(models.Manager, {
                foreignKey: 'userId',
                as: 'markdownData',
            });
        }
    }
    MarkdownDoctor.init(
        {
            doctorId: DataTypes.INTEGER,
            contentHTML: DataTypes.TEXT,
            contentMarkdown: DataTypes.TEXT,
            description: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'MarkdownDoctor',
        },
    );
    return MarkdownDoctor;
};
