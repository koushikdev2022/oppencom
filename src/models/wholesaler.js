"use strict";
const { Model, DataTypes, Sequelize } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    class Wholesaler extends Model {
        static associate(models) {

          
        }
    }

    Wholesaler.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            username: DataTypes.STRING,
            password: DataTypes.STRING,
            role_type_id: DataTypes.INTEGER,
            contact_person: DataTypes.STRING,
            email: DataTypes.STRING,
            company_name: DataTypes.STRING,
            phone: DataTypes.STRING,
            address: DataTypes.TEXT,
            avatar: DataTypes.STRING,
            otp: DataTypes.STRING,
            otp_expired_at: DataTypes.DATE,
            refresh_token: DataTypes.TEXT,
            is_otp_verified: DataTypes.TINYINT,
            is_active: DataTypes.TINYINT,
            created_at: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.NOW,
            },
        },
        {
            sequelize,
            modelName: "Wholesaler",
            tableName: "wholesalers",
            timestamps: false,
            underscored: true,
        }
    );

 

    return Wholesaler;
};
