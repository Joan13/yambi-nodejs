import http from 'http';
import Yambi from '../express';
import { Messages, MessagesModel } from '../../models/messages';
import { Op } from 'sequelize';
import fs from 'fs';
import path from 'path';
import FindUserMessages from './find_user_messages';
import moment from 'moment';
import { User, UsersModel } from '../../models/users';

export default function SocketMessage() {
    const server = http.createServer(Yambi);
    let io = require('socket.io')(server);

    io.on("connection", socket => {
        console.log("a user connected :D");
        // console.log(socket.id);

        socket.emit('send_assemble');

        socket.emit('youConnected');

        // socket.on('chat', (phone) => {
        //     console.log("chat");
        //     socket.to("room" + phone).emit('room_message');
        // });

        socket.on('assemble', async (phone_number) => {
            if (phone_number !== "") {

                socket.join("room" + phone_number);
                console.log("Created room" + phone_number);

                try {
                    const messagesUpdates = await MessagesModel.find({
                        sender: phone_number,
                        message_read: { $eq: 2 }
                    });

                    if (messagesUpdates.length > 0) {
                        // console.log(messagesUpdates.length)
                        socket.emit("messagesUpdates" + phone_number, messagesUpdates);
                    }

                } catch (error) { }



                try {
                    const messagesRead = await MessagesModel.find({
                        sender: phone_number,
                        message_read: { $eq: 3 }
                    });

                    if (messagesRead.length > 0) {
                        socket.emit("messagesRead" + phone_number, messagesRead);
                    }
                } catch (error) { }

                try {
                    const messages = await MessagesModel.find({
                        receiver: phone_number,
                        message_read: { $eq: 0 }
                    });

                    setTimeout(() => {
                        if (messages) {
                            socket.emit("newMessages" + phone_number, messages);
                        }
                        console.log(messages.length)
                    }, 2000);

                } catch (error) {
                    console.log(error);
                }
            }
        });


        // On ask messages update
        socket.on('messagesUpdates', async (phone_number) => {

            socket.join("room" + phone_number);
            console.log("Created room" + phone_number);

            try {
                const messagesUpdates = await MessagesModel.find({ $where: "this.sender == " + phone_number + " && this.message_read == 2 || this.message_read == 3" });

                if (messagesUpdates) {
                    socket.emit("messagesUpdates" + phone_number, messagesUpdates);
                }

            } catch (error) {
                console.log(error);
            }
        });


        // User sends single receive message status
        socket.on('messageReceived', async (msg) => {
            try {
                const mm = {
                    sender: msg.sender,
                    receiver: msg.receiver,
                    main_text_message: msg.main_text_message,
                    message_type: msg.type,
                    response_to: msg.response_to,
                    message_read: 2,
                    flag: msg.flag,
                    reactions: msg.reactions,
                    platform: msg.platform,
                    message_effect: msg.message_effect,
                    token: msg.token,
                    deleted: msg.deleted,
                    playedAt: msg.playedAt,
                    receivedAt: moment(new Date()).format(),
                    readAt: '',
                }

                await MessagesModel.findByIdAndUpdate(msg.token, mm);

                socket.to("room" + msg.sender).emit('messageUpdate' + msg.sender, mm);
                socket.emit('messageUpdate' + msg.receiver, mm);
            } catch (error) {
                console.log(error)
            }
        });

        // User sends multiple receive message status
        socket.on('messagesReceived', async (msgs) => {
            // console.log(msgs)
            for (let i in msgs) {
                try {
                    const mm = {
                        sender: msgs[i].sender,
                        receiver: msgs[i].receiver,
                        main_text_message: msgs[i].main_text_message,
                        message_type: msgs[i].type,
                        response_to: msgs[i].response_to,
                        message_read: 2,
                        flag: msgs[i].flag,
                        reactions: msgs[i].reactions,
                        platform: msgs[i].platform,
                        message_effect: msgs[i].message_effect,
                        token: msgs[i].token,
                        deleted: msgs[i].deleted,
                        playedAt: msgs[i].playedAt,
                        receivedAt: moment(new Date()).format(),
                        readAt: '',
                    }

                    await MessagesModel.findByIdAndUpdate(msgs[i].token, mm);

                    socket.to("room" + msgs[i].sender).emit('messageUpdate' + msgs[i].sender, mm);
                    socket.emit('messageUpdate' + msgs[i].receiver, mm);
                } catch (error) {
                    console.log(error)
                }
            }
        });

        socket.on('messagesRead', async (msgs) => {
            // console.log(msgs)
            for (let i in msgs) {
                try {
                    const mm = {
                        sender: msgs[i].sender,
                        receiver: msgs[i].receiver,
                        main_text_message: msgs[i].main_text_message,
                        message_type: msgs[i].type,
                        response_to: msgs[i].response_to,
                        message_read: 4,
                        flag: msgs[i].flag,
                        reactions: msgs[i].reactions,
                        platform: msgs[i].platform,
                        message_effect: msgs[i].message_effect,
                        token: msgs[i].token,
                        deleted: msgs[i].deleted,
                        playedAt: msgs[i].playedAt,
                        receivedAt: moment(new Date()).format(),
                        readAt: '',
                    }

                    await MessagesModel.findByIdAndUpdate(msgs[i].token, mm);
                } catch (error) {
                    console.log(error)
                }
            }

            if (msgs.length > 0) {
                socket.emit('messagesRead' + msgs[0].receiver, msgs);
                socket.to("room" + msgs[0].sender).emit('messagesRead' + msgs[0].sender, msgs);
            }
        });

        socket.on('messagesReadWithoutResponse', async (msgs) => {
            // console.log(msgs)
            for (let i in msgs) {
                try {
                    const mm = {
                        sender: msgs[i].sender,
                        receiver: msgs[i].receiver,
                        main_text_message: msgs[i].main_text_message,
                        message_type: msgs[i].type,
                        response_to: msgs[i].response_to,
                        message_read: 4,
                        flag: msgs[i].flag,
                        reactions: msgs[i].reactions,
                        platform: msgs[i].platform,
                        message_effect: msgs[i].message_effect,
                        token: msgs[i].token,
                        deleted: msgs[i].deleted,
                        receivedAt: moment(new Date()).format(),
                        readAt: '',
                        playedAt: msgs[i].playedAt
                    }

                    await MessagesModel.findByIdAndUpdate(msgs[i].token, mm);
                    // socket.emit('messageUpdate' + msgs[i].receiver, mm);
                } catch (error) {
                    console.log(error)
                }
            }
        });

        socket.on('messageRead', async (msg) => {

            try {
                const mm = {
                    sender: msg.sender,
                    receiver: msg.receiver,
                    main_text_message: msg.main_text_message,
                    message_type: msg.type,
                    response_to: msg.response_to,
                    message_read: 3,
                    flag: msg.flag,
                    reactions: msg.reactions,
                    platform: msg.platform,
                    message_effect: msg.message_effect,
                    token: msg.token,
                    deleted: msg.deleted,
                    receivedAt: msg.receivedAt,
                    playedAt: msg.playedAt,
                    readAt: moment(new Date()).format(),
                }

                await MessagesModel.findByIdAndUpdate(msg.token, mm);

                socket.to("room" + msg.sender).emit('messageUpdate' + msg.sender, mm);
                socket.emit('messageUpdate' + msg.receiver, mm);
            } catch (error) {
                console.log(error)
            }
        });

        socket.on('update_contacts', async (contacts) => {
            let contacts_returned = [];
            // for (let i in contacts) {
            //     const cc = contacts[i].phoneNumber;

            //     await User.findOne({ where: { phone_number: cc } })
            //         .then(user => {
            //             if (user !== null) {
            //                 user.dataValues.user_names = contacts[i].displayName;
            //                 contacts_returned.push(user.dataValues);
            //             }
            //         })
            // }

            // setTimeout(() => {
            //     socket.emit('update_contacts', contacts_returned);
            // }, [2000]);

            let ppromise = new Promise((resolve, reject) => {
                let counter = 0;
                for (let i in contacts) {
                    const cc = contacts[i].phoneNumber;

                    UsersModel.findOne({ phone_number: cc })
                        .then(user => {
                            if (user !== null) {
                                // user.dataValues.user_names = contacts[i].displayName;

                                // if(user.dataValues.phone_number !== phone_number) {
                                contacts_returned.push(user);
                                // }

                                // console.log("Not null")
                            }
                            // console.log(userr)
                        })

                    counter = counter + 1;
                    // console.log(counter);

                    if (counter === contacts.length) {
                        // resolve(counter);
                        // console.log(counter +" : "+contacts.length);
                        resolve(counter);
                    }
                }
            })

            ppromise.then((result) => {

                setTimeout(() => {
                    if (result === contacts.length) {
                        // console.log(contacts_returned);
                        // response.send({ success: "1", assemble: user, contacts: contacts_returned });
                        socket.emit('update_contacts', contacts_returned);
                    }
                }, 2000)
            })
        });

        socket.on("newMessage", async (msg) => {
            try {
                await MessagesModel.create({
                    _id: msg.token,
                    sender: msg.sender,
                    receiver: msg.receiver,
                    main_text_message: msg.main_text_message,
                    message_type: msg.message_type,
                    response_to: msg.response_to,
                    message_read: msg.message_read,
                    reactions: msg.reactions,
                    flag: msg.flag,
                    platform: msg.platform,
                    message_effect: msg.message_effect,
                    token: msg.token,
                    deleted: 0,
                    receivedAt: '',
                    playedAt: '',
                    readAt: '',
                    cc: moment(new Date()).format('DD/MM/YYYY')
                })
                    .then(item => {
                        if (item.message_read === 0) {
                            socket.to("room" + msg.receiver).emit('newMessage' + msg.receiver, item);
                        }
                        socket.emit('messageSent' + msg.sender, item);
                        // console.log("Created message item")
                    });
            } catch (error) {
                const mms = await MessagesModel.find({ _id: msg.token });
                if (mms.length !== 0) {
                    if (mms[0].message_read === 0) {
                        socket.to("room" + msg.receiver).emit('newMessage' + msg.receiver, mms[0]);
                        // socket.broadcast.emit('newMessage' + msg.receiver, mms[0]);
                    }
                    socket.emit('messageSent' + msg.sender, mms[0]);
                }
            }
        });
    });

    let port = 3453;
    server.listen(port, () => { console.log(`Started successfully on port ${port}`); });
}
