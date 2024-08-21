import http from 'http';
import Yambi, { randomString, renderDateUpToMilliseconds } from '../Express';
import { MessagesModel } from '../../models/Messages';
import moment from 'moment';
import { UsersModel } from '../../models/Users';
import { BusinessItemsModel } from '../../models/Item';
import { SalesModel } from '../../models/Sales';
import { ItemPricesModel } from '../../models/ItemPrices';
import { BusinessDataWatcherModel } from '../../models/BusinessDataWatcher';
import { BusinessUsersModel } from '../../models/BusinessUsers';
import { BusinessModel } from '../../models/Business';
import { SellsPointModel } from '../../models/SellsPoint';

export default function SocketMessage() {
    const server = http.createServer(Yambi);
    let io = require('socket.io')(server);

    io.on("connection", socket => {
        console.log("a user connected :D");

        socket.emit('send_assemble');

        socket.emit('youConnected');

        // socket.on('chat', (phone) => {
        //     console.log("chat");
        //     socket.to("room" + phone).emit('room_message');
        // });

        const renderItemFromWatcher = async (item_idd, phone_number) => {
            // console.log(item_idd)
            try {
                const items = await BusinessItemsModel.find({ _id: item_idd });
                // console.log(items);
                socket.emit('itemsChanged' + phone_number, items);
            } catch (error) { }
        }

        const renderPriceFromWatcher = async (price_idd, phone_number) => {
            try {
                const prices = await ItemPricesModel.find({ _id: price_idd });
                socket.emit('pricesChanged' + phone_number, prices);
                // console.log(prices)
            } catch (error) { }
        }

        const renderSalesFromWatcher = async (sale_idd, phone_number) => {
            try {
                const sales = await SalesModel.find({ _id: sale_idd });
                socket.emit('salesChanged' + phone_number, JSON.stringify(sales));
            } catch (error) { }
        }

        // const renderUserFromWatcher = async (userr) => {
        //     // console.log()
        //     try {
        //         const dataUserInstance = await BusinessUsersModel.find({ user: userr });
        //         // console.log(dataUserInstance);
        //         socket.emit('addedToBusiness', JSON.stringify(dataUserInstance));

        //         for (let i in dataUserInstance) {

        //             if (dataUserInstance[i].level === 1) {
        //                 try {
        //                     const sales_points = await SellsPointModel.find({ business_id: dataUserInstance[i].business_id });
        //                     console.log(sales_points)
        //                     socket.emit('salesPointsAddedTo', JSON.stringify(sales_points));
        //                 } catch (error) { }
        //             } else {
        //                 if (dataUserInstance[i].sales_point_id !== "" && dataUserInstance[i].user) {
        //                     try {
        //                         const sales_points = await SellsPointModel.find({ _id: dataUserInstance[i].sales_point_id });
        //                         socket.emit('salesPointsAddedTo', JSON.stringify(sales_points));
        //                     } catch (error) { }
        //                 }
        //             }
        //         }

        //     } catch (error) { }
        // }

        // const renderBusinessesFromWatcher = async (business_idd) => {
        //     try {
        //         const businesses = await BusinessModel.find({ _id: business_idd });
        //         socket.emit('businessesAddedTo', JSON.stringify(businesses));
        //     } catch (error) { }
        // }

        // const renderSalesPointsFromWatcher = async (sales_point_idd) => {
        //     try {
        //         const sales_points = await SellsPointModel.find({ _id: sales_point_idd });
        //         socket.emit('salesPointsAddedTo', JSON.stringify(sales_points));
        //     } catch (error) { }
        // }

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
                        // console.log(messages.length)
                    }, 2000);

                } catch (error) { }

                // try {
                //     const watcherInstance = await BusinessDataWatcherModel.find({ user: phone_number });

                //     if (watcherInstance.length > 0) {
                //         for (let i in watcherInstance) {
                //             if (watcherInstance[i].user !== "") {
                //                 renderUserFromWatcher(watcherInstance[i].user);

                //                 renderBusinessesFromWatcher(watcherInstance[i].business_id);
                //                 // console.log(watcherInstance[i].sales_point_id)
                //                 // if (watcherInstance[i].sales_point_id !== "" || watcherInstance[i].user === phone_number) {

                //                 //     renderSalesPointsFromWatcher(watcherInstance[i].sales_point_id);
                //                 // }
                //             }

                //             // if (watcherInstance[i].item_id !== "") {
                //             //     renderItemFromWatcher(watcherInstance[i].item_id);
                //             // }

                //             // if (watcherInstance[i].item_price_id !== "") {
                //             //     renderPriceFromWatcher(watcherInstance[i].item_price_id);
                //             // }

                //             // if (watcherInstance[i].sale_id !== "") {
                //             //     renderSalesFromWatcher(watcherInstance[i].sale_id);
                //             // }
                //         }
                //     }

                // } catch (error) { }

                try {
                    const watcherInstance2 = await BusinessDataWatcherModel.find({ phone_number: phone_number });

                    if (watcherInstance2.length > 0) {
                        for (let i in watcherInstance2) {
                            // if (watcherInstance2[i].user !== "") {
                            //     renderUserFromWatcher(watcherInstance2[i].user);

                            //     renderBusinessesFromWatcher(watcherInstance2[i].business_id);

                            //     if (watcherInstance2[i].sales_point_id !== "") {
                            //         renderSalesPointsFromWatcher(watcherInstance2[i].sales_point_id);
                            //     }
                            // }

                            if (watcherInstance2[i].item_id !== "") {
                                renderItemFromWatcher(watcherInstance2[i].item_id, phone_number);
                            }

                            if (watcherInstance2[i].item_price_id !== "") {
                                renderPriceFromWatcher(watcherInstance2[i].item_price_id, phone_number);
                            }

                            if (watcherInstance2[i].sale_id !== "") {
                                renderSalesFromWatcher(watcherInstance2[i].sale_id, phone_number);
                            }
                        }
                    }

                } catch (error) { }
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
                // console.log(error);
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
            } catch (error) { }
        });

        // User sends multiple receive message status
        socket.on('messagesReceived', async (msgs) => {
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
                    // console.log(error)
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
                    // console.log(error)
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
                // console.log(error)
            }
        });

        socket.on('update_contacts', async (contacts) => {
            let contacts_returned = [];

            let ppromise = new Promise((resolve, reject) => {
                let counter = 0;
                for (let i in contacts) {
                    const cc = contacts[i].phoneNumber;

                    UsersModel.findOne({ phone_number: cc })
                        .then(contact => {
                            if (contact !== null) {
                                const cc = {
                                    user_id: contact._id,
                                    user_names: contact.user_names,
                                    phone_number: contact.phone_number,
                                    gender: contact.gender + "",
                                    birth_date: contact.birth_date,
                                    country: contact.country,
                                    user_profile: contact.user_profile,
                                    profession: contact.profession,
                                    bio: contact.bio,
                                    user_email: contact.user_email,
                                    user_address: contact.user_address,
                                    status_information: contact.status_information,
                                    user_password: contact.user_password,
                                    account_privacy: contact.account_privacy + "",
                                    account_valid: contact.account_valid + "",
                                    notification_token: contact.notification_token,
                                    createdAt: contact.createdAt,
                                    updatedAt: contact.updatedAt,
                                }
                                contacts_returned.push(cc);
                            }
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

        socket.on('newItems', async its => {

            // console.log(its)

            const itss = JSON.parse(its);
            const items = itss.items;
            const phn = itss.phone_number;

            for (let i in items) {
                // console.log(items[i]._id)
                try {
                    const mm = {
                        _id: items[i]._id,
                        business_id: items[i].business_id,
                        phone_number: items[i].phone_number,
                        item_name: items[i].item_name,
                        slogan: items[i].slogan,
                        item_type: parseInt(items[i].item_type),
                        wholesale_content_number: parseInt(items[i].wholesale_content_number),
                        items_number_stock: parseInt(items[i].items_number_stock),
                        items_number_warehouse: parseInt(items[i].items_number_warehouse),
                        description_item: items[i].description_item,
                        keywords: items[i].keywords,
                        images: items[i].images,
                        background: items[i].background,
                        item_active: parseInt(items[i].item_active),
                        createdAt: items[i].createdAt,
                        updatedAt: items[i].updatedAt
                    }

                    await BusinessItemsModel.findByIdAndUpdate(items[i]._id, {
                        _id: items[i]._id,
                        business_id: items[i].business_id,
                        phone_number: items[i].phone_number,
                        item_name: items[i].item_name,
                        slogan: items[i].slogan,
                        item_type: parseInt(items[i].item_type),
                        wholesale_content_number: parseInt(items[i].wholesale_content_number),
                        items_number_stock: parseInt(items[i].items_number_stock),
                        items_number_warehouse: parseInt(items[i].items_number_warehouse),
                        description_item: items[i].description_item,
                        keywords: items[i].keywords,
                        images: items[i].images,
                        background: items[i].background,
                        item_active: parseInt(items[i].item_active)
                    }, { upsert: true });

                    try {
                        const userss = await BusinessUsersModel.find({ business_id: mm.business_id });
                        // console.log()
                        if (userss.length > 0) {
                            for (let i in userss) {
                                // console.log(mm._id);
                                socket.to("room" + userss[i].user).emit('itemsChanged' + userss[i].user, [mm]);
                                // console.log(userss[i].user + " " + phn)
                                if (userss[i].user !== phn) {
                                    // console.log("Item added");
                                    try {
                                        await BusinessDataWatcherModel.create({
                                            _id: randomString(5) + renderDateUpToMilliseconds(),
                                            business_id: "",
                                            sales_point_id: "",
                                            user: "",
                                            phone_number: userss[i].user,
                                            item_id: mm._id,
                                            item_price_id: "",
                                            sale_id: "",
                                            expense_id: "",
                                            loan_id: ""
                                        });
                                    } catch (error) { }
                                }
                            }
                        }
                    } catch (error) { }
                } catch (error) { }
            }

            // setTimeout(()=> {
            socket.emit('itemsChanged' + phn, items);
            // }, 3000);
        });

        socket.on('newSales', async its => {

            const itss = JSON.parse(its);
            const sales = itss.items;
            const phn = itss.phone_number;

            for (let i in sales) {
                try {
                    const mm = {
                        _id: sales[i]._id,
                        item_id: sales[i].item_id,
                        business_id: sales[i].business_id,
                        sales_point_id: sales[i].sales_point_id,
                        sale_operator: sales[i].sale_operator,
                        number: parseInt(sales[i].number),
                        cost_price: sales[i].cost_price,
                        selling_price: sales[i].selling_price,
                        delivery_price: sales[i].delivery_price,
                        delivery_address: sales[i].delivery_address,
                        discount_price: sales[i].discount_price,
                        sale_active: parseInt(sales[i].sale_active),
                        delivery_time: sales[i].delivery_price,
                        type_sale: sales[i].type_sale,
                        buyer_name: sales[i].buyer_name,
                        currency: sales[i].currency,
                        buyer_phone: sales[i].buyer_phone,
                        createdAt: sales[i].createdAt,
                        updatedAt: sales[i].updatedAt
                    }

                    await SalesModel.findByIdAndUpdate(sales[i]._id, {
                        _id: sales[i]._id,
                        item_id: sales[i].item_id,
                        business_id: sales[i].business_id,
                        sales_point_id: sales[i].sales_point_id,
                        sale_operator: sales[i].sale_operator,
                        number: parseInt(sales[i].number),
                        cost_price: sales[i].cost_price,
                        selling_price: sales[i].selling_price,
                        delivery_price: sales[i].delivery_price,
                        delivery_address: sales[i].delivery_address,
                        discount_price: sales[i].discount_price,
                        sale_active: parseInt(sales[i].sale_active),
                        delivery_time: sales[i].delivery_price,
                        createdAt: sales[i].createdAt,
                        updatedAt: sales[i].updatedAt,
                        buyer_name: sales[i].buyer_name,
                        buyer_phone: sales[i].buyer_phone,
                        currency: sales[i].currency,
                        type_sale: sales[i].type_sale
                    }, { upsert: true });

                    try {
                        // console.log(mm)
                        const bbb = await SellsPointModel.findOne({ _id: sales[i].sales_point_id });
                        if (bbb !== null) {
                            try {
                                const userss = await BusinessUsersModel.find({ business_id: bbb.business_id });
                                if (userss.length > 0) {

                                    for (let i in userss) {
                                        if (userss[i].user !== phn) {
                                            // console.log("ok")
                                            socket.to("room" + userss[i].user).emit('salesChanged' + userss[i].user, JSON.stringify([mm]));

                                            try {
                                                await BusinessDataWatcherModel.create({
                                                    _id: randomString(5) + renderDateUpToMilliseconds(),
                                                    business_id: "",
                                                    sales_point_id: "",
                                                    user: "",
                                                    phone_number: userss[i].user,
                                                    item_id: "",
                                                    item_price_id: "",
                                                    sale_id: mm._id,
                                                    expense_id: "",
                                                    loan_id: ""
                                                });
                                            } catch (error) { }
                                        }
                                    }
                                }
                            } catch (error) { }
                        }
                    } catch (error) { }
                } catch (error) {
                    // console.log(error)
                }
            }

            socket.emit('salesChanged' + phn, JSON.stringify(sales));
        });

        socket.on('newItemPrices', async its => {
            // console.log(prices)

            const itss = JSON.parse(its);
            const prices = itss.items;
            const phn = itss.phone_number;

            for (let i in prices) {
                try {
                    const mm = {
                        _id: prices[i]._id,
                        item_id: prices[i].item_id,
                        phone_number: prices[i].phone_number,
                        wholesale_cost_price: prices[i].wholesale_cost_price,
                        wholesale_selling_price: prices[i].wholesale_selling_price,
                        retail_selling_price: prices[i].retail_selling_price,
                        // uploaded: prices[i].uploaded,
                        currency: parseInt(prices[i].currency)
                    }

                    await ItemPricesModel.findByIdAndUpdate(prices[i]._id, mm, { upsert: true });

                    try {

                        // console.log(mm)
                        const bbb = await BusinessItemsModel.findOne({ _id: prices[i].item_id });
                        if (bbb !== null) {
                            try {
                                const userss = await BusinessUsersModel.find({ business_id: bbb.business_id });
                                if (userss.length > 0) {

                                    for (let i in userss) {
                                        if (userss[i].user !== phn) {
                                            socket.to("room" + userss[i].user).emit('pricesChanged' + userss[i].user, [mm]);

                                            try {
                                                await BusinessDataWatcherModel.create({
                                                    _id: randomString(5) + renderDateUpToMilliseconds(),
                                                    business_id: "",
                                                    sales_point_id: "",
                                                    user: "",
                                                    phone_number: userss[i].user,
                                                    item_id: "",
                                                    item_price_id: mm._id,
                                                    sale_id: "",
                                                    expense_id: "",
                                                    loan_id: ""
                                                });
                                            } catch (error) { console.log(error) }
                                        }
                                    }
                                }
                            } catch (error) { }
                        }
                    } catch (error) { }

                } catch (error) {
                    // console.log(error)
                }
            }

            socket.emit("pricesChanged" + phn, prices);
        });

        socket.on("check_sales", async sss => {
            const sales = JSON.parse(sss);
            // console.log(JSON.parse(sales));

            for (let i in sales) {
                try {
                    const item_sales = await SalesModel.find({ item_id: sales[i].item });

                    if (item_sales) {
                        if (item_sales.length !== sales[i].sale_length) {
                            socket.emit("sales_update", JSON.stringify(item_sales));
                        }
                    }

                } catch (error) { }

                // console.log(sales[i].item)
            }
        });

        socket.on('itemChanged', async dta => {

            const data = JSON.parse(dta);

            const item = data.item;
            const phone_number = data.phone_number;

            try {
                await BusinessDataWatcherModel.deleteOne({ item_id: item, phone_number: phone_number });
            } catch (error) { }
        })

        socket.on('pricesChanged', async dta => {

            const data = JSON.parse(dta);

            const item = data.item;
            const phone_number = data.phone_number;

            try {
                await BusinessDataWatcherModel.deleteOne({ item_price_id: item, phone_number: phone_number });
            } catch (error) { }
        })

        socket.on('salesChanged', async dta => {

            const data = JSON.parse(dta);

            const item = data.item;
            const phone_number = data.phone_number;

            try {
                await BusinessDataWatcherModel.deleteOne({ sale_id: item, phone_number: phone_number });
            } catch (error) { }
        })

        // socket.on('businessAddedTo', async item => {
        //     try {
        //         await BusinessDataWatcherModel.deleteOne({ business_id: item });
        //     } catch (error) { }
        // });

        // socket.on('addedBusinessUser', async item => {
        //     try {
        //         await BusinessDataWatcherModel.deleteOne({ user: item });
        //     } catch (error) { }
        // });

        // socket.on('SalesPointAddedTo', async item => {
        //     try {
        //         await BusinessDataWatcherModel.deleteOne({ sales_point_id: item });
        //     } catch (error) { }
        // });

    });

    let port = 3453;
    server.listen(port, () => { console.log(`Started successfully on port ${port}`); });
}
