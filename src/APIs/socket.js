import http from 'http';
import Yambi from '../express';
import { Messages } from '../../models/messages';
import {Op} from 'sequelize';
import fs from 'fs';
import path from 'path';
import FindUserMessages from './find_user_messages';

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
                    date_creation:msg.date_creation,
                    deleted: "0"
                }
            })
                .then((new_message) => {
                    socket.broadcast.emit("newMessage" + msg.receiver, msg);
                    socket.broadcast.emit("messageSent" + msg.sender, msg.message_id);
                })
                .catch((error) => {
                    console.log("Error while sending the message" + error);
                })
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
                        date_creation:msg.date_creation,
                        deleted: "0"
                    }
                })
                    .then((new_message) => {
                        socket.broadcast.emit("newMessage" + msg.receiver, new_message);
                        socket.broadcast.emit("messageSent" + msg.sender, msg.message_id);
                    })
                    .catch((error) => {
                        console.log("Error while sending the message" + error);
                    })
            }
        });

        socket.on('checkMessagesStatus',data=>{
            // Yambi.post("/yambi/API/find_user_messages", (request, response) => {
            //     let user = request.body.user;

            let messages = [];
            for (let i in data.messages){
                    Messages.findAll({
                        where: {
                            sender:data.user,
                            receiver:data.messages[i].receiver,
                            token:data.messages[i].token,
                            // message_read:{[Op.ne]:"1"}
                        }
                    })
                        .then((message) => {

                            
                            // 
                                if(data.messages[i].message_read !== message[0].message_read) {
                                    console.log(message[0].token + " " + data.messages[i].message_read);
                                }
                            // }
                            // io.emit("messagesStatusChange" + user.phone_number,messages);
                        })
                        .catch((error) => {
                            console.log("Error while sending the message" + error);
                        })
                }
            // });
        })
    });

    let port = 3453;
    server.listen(port, () => { console.log(`Started successfully on port ${port}`); });
}
