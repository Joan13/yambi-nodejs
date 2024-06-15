// import Sequelize from "sequelize";
// import { sequelize } from "../util/database";

// export const User = sequelize.define("yb_table_users", {
//     user_id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     user_names: {
//         type: Sequelize.STRING(35),
//         allowNull: false,
//         default: "",
//     },
//     phone_number: {
//         type: Sequelize.STRING(20),
//         allowNull: false
//     },
//     gender: {
//         type: Sequelize.STRING(1),
//         allowNull: false,
//         default: "",
//     },
//     birth_date: {
//         type: Sequelize.STRING(20),
//         allowNull: true,
//         default: "",
//     },
//     country: {
//         type: Sequelize.STRING(5),
//         allowNull: false,
//         default: "",
//     },
//     user_profile: {
//         type: Sequelize.STRING(255),
//         allowNull: false,
//         default: "",
//     },
//     user_email: {
//         type: Sequelize.STRING(70),
//         allowNull: false,
//         default: "",
//     },
//     user_address: {
//         type: Sequelize.STRING(100),
//         allowNull: false,
//         default: "",
//     },
//     bio: {
//         type: Sequelize.STRING(255),
//         allowNull: false,
//         default: "",
//     },
//     profession: {
//         type: Sequelize.STRING(30),
//         allowNull: false,
//         default: "",
//     },
//     status_information: {
//         type: Sequelize.STRING(100),
//         allowNull: false,
//         default: "",
//     },
//     user_password: {
//         type: Sequelize.STRING(255),
//         allowNull: false,
//         default: "",
//     },
//     notification_token: {
//         type: Sequelize.STRING(150),
//         allowNull:false,
//         default: "",
//     },
//     account_privacy: {
//         type: Sequelize.STRING(10),
//         allowNull: false,
//         default: "",
//     },
//     account_valid: {
//         type: Sequelize.STRING(1),
//         allowNull: false,
//         default: "",
//     }
// },
// {charset:'utf8mb4'});

import { unix } from "moment";
import mongoose from "mongoose";

const UsersSchema = mongoose.Schema(
    {
        _id: { type: String, unique: true },
        phone_number: { type: String, required: true, unique: true },
        user_names: { type: String, required: true },
        gender: { type: Number, required: true },
        birth_date: { type: String },
        country: { type: String, required: true },
        user_profile: { type: String },
        reactions: { type: String },
        user_email: { type: String },
        user_address: { type: String },
        bio: { type: String },
        profession: { type: String },
        status_information: { type: String },
        user_password: { type: String },
        notification_token: { type: String },
        account_privacy: { type: Number },
        account_valid: { type: Number },
        cc: { type: String }
    },
    {
        timestamps: true,
        primaryKey: '_id'
    }
)

export const UsersModel = mongoose.model("users_yb", UsersSchema, 'users_center');

