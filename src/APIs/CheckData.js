import { BusinessModel } from "../../models/Business";
import { BusinessDataWatcherModel } from "../../models/BusinessDataWatcher";
import { BusinessUsersModel } from "../../models/BusinessUsers";
import { BusinessItemsModel } from "../../models/Item";
import { ItemPricesModel } from "../../models/ItemPrices";
import { SalesModel } from "../../models/Sales";
import { SellsPointModel } from "../../models/SellsPoint";
import { UsersModel } from "../../models/Users";
import Yambi, { randomString, renderDateUpToMilliseconds } from "../Express";

export default function CheckData() {

    Yambi.post("/yambi/API/check_data", async (request, response) => {

        const o_items = request.body.o_items;
        const o_sales = request.body.o_sales;
        const o_prices = request.body.o_prices;
        const phone_number = request.body.phone_number;
        let businesses = [];
        let sells_points = [];
        let users = [];
        let itemss = [];
        let prices = [];
        let sales = [];

        //         try {
        //             const ppl = await BusinessUsersModel.find({ phone_number: "oko" })
        //             .then((users)=> {
        // console.log(users)
        //             })
        //         } catch (error) {

        //         }

        for (let i in o_items) {
            try {
                const mm = {
                    _id: o_items[i]._id,
                    business_id: o_items[i].business_id,
                    phone_number: o_items[i].phone_number,
                    item_name: o_items[i].item_name,
                    slogan: o_items[i].slogan,
                    item_type: parseInt(o_items[i].item_type),
                    wholesale_content_number: parseInt(o_items[i].wholesale_content_number),
                    items_number_stock: parseInt(o_items[i].items_number_stock),
                    items_number_warehouse: parseInt(o_items[i].items_number_warehouse),
                    description_item: o_items[i].description_item,
                    keywords: o_items[i].keywords,
                    images: o_items[i].images,
                    background: o_items[i].background,
                    item_active: parseInt(o_items[i].item_active),
                }

                await BusinessItemsModel.findByIdAndUpdate(o_items[i]._id, mm, { upsert: true });

                try {
                    const userss = await BusinessUsersModel.find({ business_id: o_items[i].business_id });
                    // console.log()
                    if (userss.length > 0) {
                        for (let i in userss) {
                            if (userss[i].user !== phone_number) {
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

            itemss.push(o_items[i]);
        }

        for (let i in o_sales) {
            try {
                const mm = {
                    _id: o_sales[i]._id,
                    item_id: o_sales[i].item_id,
                    sales_point_id: o_sales[i].sales_point_id,
                    sale_operator: o_sales[i].sale_operator,
                    number: parseInt(o_sales[i].number),
                    cost_price: o_sales[i].cost_price,
                    selling_price: o_sales[i].selling_price,
                    delivery_price: o_sales[i].delivery_price,
                    delivery_address: o_sales[i].delivery_address,
                    discount_price: o_sales[i].discount_price,
                    sale_active: parseInt(o_sales[i].sale_active),
                    delivery_time: o_sales[i].delivery_price,
                    createdAt: o_sales[i].createdAt,
                }

                await SalesModel.findByIdAndUpdate(o_sales[i]._id, mm, { upsert: true });

                try {
                    const bbb = await SellsPointModel.findOne({ _id: o_items[i].sales_point_id });
                    if (bbb !== null) {
                        try {
                            const userss = await BusinessUsersModel.find({ business_id: bbb.business_id });
                            if (userss.length > 0) {
                                for (let i in userss) {
                                    if (userss[i].user !== phone_number) {
                                        // console.log("Item added");
                                        try {
                                            await BusinessDataWatcherModel.create({
                                                _id: randomString(5) + renderDateUpToMilliseconds(),
                                                business_id: "",
                                                sales_point_id: "",
                                                user: "",
                                                phone_number: userss[i].user,
                                                item_id: "",
                                                item_price_id: "",
                                                sale_id: o_sales[i]._id,
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
            } catch (error) { }
        }

        for (let i in o_prices) {
            try {
                const mm = {
                    _id: o_prices[i]._id,
                    item_id: o_prices[i].item_id,
                    phone_number: o_prices[i].phone_number,
                    wholesale_cost_price: o_prices[i].wholesale_cost_price,
                    wholesale_selling_price: o_prices[i].wholesale_selling_price,
                    retail_selling_price: o_prices[i].retail_selling_price,
                    // uploaded: prices[i].uploaded,
                    currency: parseInt(o_prices[i].currency)
                }

                await ItemPricesModel.findByIdAndUpdate(o_prices[i]._id, mm, { upsert: true });

                try {
                    const bbb = await BusinessItemsModel.findOne({ _id: o_prices[i].item_id });
                    if (bbb !== null) {
                        try {
                            const userss = await BusinessUsersModel.find({ business_id: bbb.business_id });
                            if (userss.length > 0) {
                                for (let i in userss) {
                                    if (userss[i].user !== phone_number) {
                                        // console.log("Item added");
                                        try {
                                            await BusinessDataWatcherModel.create({
                                                _id: randomString(5) + renderDateUpToMilliseconds(),
                                                business_id: "",
                                                sales_point_id: "",
                                                user: "",
                                                phone_number: userss[i].user,
                                                item_id: "",
                                                item_price_id: o_prices[i].item_id,
                                                sale_id: "",
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
            } catch (error) { }
        }

        try {
            const watcherInstance = await BusinessDataWatcherModel.find({ phone_number: phone_number });

            for (let i in watcherInstance) {
                if (watcherInstance[i].item_id !== "") {
                    try {
                        const iits = await BusinessItemsModel.find({ _id: watcherInstance[i].item_id });
                        for (let i in iits) { itemss.push(iits[i]) }
                    } catch (error) { }
                }

                if (watcherInstance[i].item_price_id !== "") {
                    try {
                        const ppcs = await ItemPricesModel.find({ _id: watcherInstance[i].item_price_id });
                        for (let i in ppcs) { prices.push(ppcs[i]) }
                    } catch (error) { }
                }

                if (watcherInstance[i].sale_id !== "") {
                    try {
                        const sas = await SalesModel.find({ _id: watcherInstance[i].sale_id });
                        for (let i in sas) { sales.push(sas[i]) }
                    } catch (error) { }
                }
            }
        } catch (error) { }

        try {
            const user = await BusinessUsersModel.find({ user: phone_number });

            for (let i in user) {
                try {
                    const bb = await BusinessModel.findOne({ _id: user[i].business_id });

                    try {
                        const sps = await BusinessItemsModel.find({ business_id: bb._id });

                        for (let i in sps) {
                            try {
                                const ips = await ItemPricesModel.find({ item_id: sps[i]._id });
                                for (let i in ips) {
                                    prices.push(ips[i]);
                                }
                            } catch (error) { }

                            try {
                                const sss = await SalesModel.find({ item_id: sps[i]._id });
                                for (let i in sss) {
                                    sales.push(sss[i]);
                                }
                            } catch (error) { }

                            itemss.push(sps[i]);
                        }

                    } catch (error) { }

                    if (user[i].sales_point_id !== "" || user[i].level === 1) {
                        try {
                            const sp = await SellsPointModel.find({ business_id: bb._id });
                            for (let i in sp) {
                                sells_points.push(sp[i]);
                            }
                        } catch (error) { }
                    }

                    businesses.push(bb);

                } catch (error) { }

                try {
                    const userrs = await BusinessUsersModel.find({ business_id: user[i].business_id });
                    // console.log(userrs)
                    for (let i in userrs) {
                        users.push(userrs[i]);
                    }
                } catch (error) { }
            }

        } catch (error) { }



        // const ContinueCheckData = async (user) => {
        // try {
        //     const user = await UsersModel.findOne({
        //         _id: phone_number
        //     });

        //     if (user !== null) {

        // let promise = new Promise((resolve, reject) => {
        //     let counter = 0;
        //     if (contacts.length > 0) {
        //         for (let i in contacts) {
        //             const cc = contacts[i].phoneNumber;

        //             UsersModel.findOne({ phone_number: cc })
        //                 .then(userr => {
        //                     if (userr !== null) {
        //                         // user.dataValues.user_names = contacts[i].displayName;

        //                         // if(user.dataValues.phone_number !== phone_number) {
        //                         const user_assemble_data = {
        //                             user_id: userr._id,
        //                             user_names: userr.user_names,
        //                             phone_number: userr.phone_number,
        //                             gender: userr.gender + "",
        //                             birth_date: userr.birth_date,
        //                             country: userr.country,
        //                             user_profile: userr.user_profile,
        //                             profession: userr.profession,
        //                             bio: userr.bio,
        //                             user_email: userr.user_email,
        //                             user_address: userr.user_address,
        //                             status_information: userr.status_information,
        //                             user_password: userr.user_password,
        //                             account_privacy: userr.account_privacy + "",
        //                             account_valid: userr.account_valid + "",
        //                             notification_token: userr.notification_token,
        //                             createdAt: userr.createdAt,
        //                             updatedAt: userr.updatedAt,
        //                         }
        //                         contacts_returned.push(user_assemble_data);
        //                         // }

        //                         // console.log("Not null")
        //                     }
        //                     // console.log(userr)
        //                 })

        //             counter = counter + 1;
        //             console.log(counter);

        //             if (counter === contacts.length) {
        //                 // resolve(counter);
        //                 // console.log(counter +" : "+contacts.length);
        //                 resolve(counter);
        //             }
        //         }
        //     } else {
        //         resolve(contacts.length);
        //     }
        // })

        // promise.then((result) => {

        // setTimeout(() => {
        response.send({ success: "1", businesses: businesses, sells_points: sells_points, items: itemss, prices: prices, sales: sales, users: users });
        // }, 5000);
        // })
        // }

        // const RegisterUser = async () => {
        //     try {
        //         await UsersModel.create({
        //             _id: phone_number,
        //             phone_number: phone_number,
        //             user_names: user_names,
        //             gender: gender,
        //             birth_date: "",
        //             country: country,
        //             user_profile: "",
        //             user_email: "",
        //             user_address: "",
        //             bio: "",
        //             profession: "",
        //             status_information: "Yambi is you and I, toi et moi :)",
        //             user_password: "",
        //             notification_token: "",
        //             account_privacy: 0,
        //             account_valid: 1,
        //         })
        //             .then((user) => {
        //                 ContinueSignup(user);
        //             })
        //     } catch (error) { }
        // }

        // try {
        //     const user = await UsersModel.findOne({
        //         _id: phone_number
        //     });

        //     if (user !== null) {
        //         ContinueSignup(user);
        //     } else {
        //         RegisterUser();
        //     }
        // } catch (error) { }

    });
}
