'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserPdfSign extends Model {
        static associate(models) {
            // Define associations here if needed
            // Example: this.belongsTo(models.PdfUrls, { foreignKey: 'pdf_table_id' });
            // Example: this.belongsTo(models.User, { foreignKey: 'user_id' });
        }
    }

    UserPdfSign.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            user_pdf_url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            pdf_table_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 1,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'UserPdfSign',
            tableName: 'user_pdf_signs',
            underscored: true,
            timestamps: false,
        }
    );

    return UserPdfSign;
};
