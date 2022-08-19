import http from 'http';
import Yambi from '../express';
import { Messages } from '../../models/messages';
import { Op } from 'sequelize';
import fs from 'fs';
import path from 'path';
import FindUserMessages from './find_user_messages';
import moment from 'moment';

export default function SocketMessage() {
    const server = http.createServer(Yambi);
    let io = require('socket.io')(server);

    io.on("connection", socket => {
        console.log("a user connected :D");

        socket.on("newMessage", msg => {
            Messages.findOrCreate({
                where: { token: msg.token },
                defaults: {
                    token: msg.token,
                    sender: msg.sender,
                    receiver: msg.receiver,
                    gender: msg.gender,
                    main_text_message: msg.main_text_message,
                    response_to: msg.response_to,
                    response_to_text: msg.response_to_text,
                    response_to_token: msg.response_to_token,
                    message_read: '0',
                    message_effect: msg.message_effect,
                    date_creation: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
                    deleted: "0"
                }
            })
                .then((new_message) => {
                    io.sockets.emit("newMessage" + msg.receiver, new_message[0]);
                    io.sockets.emit("messageSent" + msg.sender, new_message[0]);
                })
                .catch((error) => { });
        });

        socket.on("sendPresavedMessages", messages => {
            for (let i in messages) {
                let msg = messages[i];
                Messages.findOrCreate({
                    where: { token: msg.token },
                    defaults: {
                        token: msg.token,
                        sender: msg.sender,
                        receiver: msg.receiver,
                        gender: msg.gender,
                        main_text_message: msg.main_text_message,
                        response_to: msg.response_to,
                        response_to_text: msg.response_to_text,
                        response_to_token: msg.response_to_token,
                        message_read: '0',
                        message_effect: msg.message_effect,
                        date_creation: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
                        deleted: "0"
                    }
                })
                    .then((new_message) => {
                        io.sockets.emit("newMessage" + msg.receiver, new_message);
                        io.sockets.emit("messageSent" + msg.sender, msg.message_id);
                    })
                    .catch((error) => { });
            }
        });

        socket.on('fetchUserMessages', user => {
            console.log(user + 'askes for his messages');
            Messages.findAll({
                where: { receiver: user, message_read: '0' }
            })
                .then((messages) => {
                    for(let i in messages) {
                        socket.broadcast.emit('newMessage' + messages[i].receiver, messages[i]);
                    }
                })
                .catch((error) => {console.log("Error while sending the message" + error);})
        });

        socket.on('check_messages_status', (data) => {
            // let messages = [];
            // console.log(data);
            for (let i in data) {
                // socket.emit('message_user_status' + data[i].sender, data[i]);
                // console.log('message_user_status' + data[i].sender);
                Messages.findAll({
                    where: {
                        token: data[i].token,
                        // message_read:{[Op.ne]:"1"}
                    }
                })
                    .then((message) => {
                        if (message[0].length !== 0 && data[i].message_read !== message[0].message_read) {
                            // console.log("message[0].message_read + ' ' + data[i].message_read");
                        // console.log(data[i]);
                        io.sockets.emit("message_user_status" + message[0].sender,message[0]);
                        }
                    })
                    .catch((error) => {
                        console.log("Error while sending the message" + error);
                    })
            }
        })

        socket.on('update_messages_delivery', (data) => {
            // let messages = [];
            // console.log(data);
            for (let i in data) {
                // socket.emit('message_user_status' + data[i].sender, data[i]);
                // console.log('message_user_status' + data[i].sender);
                Messages.update({ message_read: data[i].message_read },
                { where: { token: data[i].token } })
                .then(() => {
                    io.sockets.emit("message_user_status" + message[0].sender,message[0]);
                })
                .catch((error) => {
                    console.log("Error while updating the message" + error);
                })
            }
        })
    });

    let port = 3453;
    server.listen(port, () => { console.log(`Started successfully on port ${port}`); });
}
