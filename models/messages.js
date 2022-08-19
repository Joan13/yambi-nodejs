import Sequelize from "sequelize";
import { sequelize } from "../util/database";

export const Messages = sequelize.define("messages", {
    message_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    sender: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    receiver: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    gender: {
        type: Sequelize.STRING(1),
        allowNull: false
    },
    main_text_message: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    response_to: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    response_to_text: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    response_to_token: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    message_read: {
        type: Sequelize.STRING(1),
        allowNull: false
    },
    message_effect: {
        type: Sequelize.STRING(2),
        allowNull: false
    },
    deleted: {
        type: Sequelize.STRING(1),
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    date_creation: {
        type: Sequelize.STRING(50),
        allowNull: false,
    }
},
    { charset: 'utf8mb4' });
