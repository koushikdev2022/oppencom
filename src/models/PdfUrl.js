'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PdfUrls extends Model {
        static associate(models) {
            // Define associations here if needed
        }
    }

    PdfUrls.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            pdf_url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
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
            modelName: 'PdfUrls',
            tableName: 'pdf_urls',
            underscored: true,
            timestamps: false,
        }
    );

    return PdfUrls;
};
