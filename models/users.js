import Sequelize from "sequelize";
import { sequelize } from "../util/database";

export const User = sequelize.define("yb_table_users", {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_names: {
        type: Sequelize.STRING(35),
        allowNull: true
    },
    phone_number: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    gender: {
        type: Sequelize.STRING(1),
        allowNull: false
    },
    birth_date: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    country: {
        type: Sequelize.STRING(5),
        allowNull: false
    },
    user_profile: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    profession: {
        type: Sequelize.STRING(30),
        allowNull: true
    },
    status_information: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    user_password: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    account_privacy: {
        type: Sequelize.STRING(1),
        allowNull: false,
    },
    account_valid: {
        type: Sequelize.STRING(1),
        allowNull: false
    }
},
{charset:'utf8mb4'});
