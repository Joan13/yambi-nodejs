import { UsersModel } from "../../models/users";
import Yambi from "../express";

export default function Signup() {

    const render_contacts = (contacts, phone_number) => {
        //                             for (let i in contacts) {
        //     const cc = contacts[i].phoneNumber;

        //     UsersModel.find({ where: { phone_number: cc } })
        //         .then(user => {
        //             if (user !== null) {
        //                 user.dataValues.user_names = contacts[i].displayName;

        //                 if(user.dataValues.phone_number !== phone_number) {
        //                     contacts_returned.push(user.dataValues);
        //                 }
        //             }
        //         })
        // }

        //         setTimeout(() => {
        //             response.send({ success: "1", assemble: new_user[0], contacts: contacts_returned });
        //         }, [2000]);
    }

    Yambi.post("/yambi/API/signup", async (request, response) => {

        const user_names = request.body.names;
        const phone_number = request.body.phone_number;
        const gender = request.body.gender;
        const country = request.body.country;
        const contacts = request.body.contacts;
        let contacts_returned = [];
        // const contacts = [];
        // const contacts = [
        //     { "displayName": "Ruphin Byadunia", "phoneNumber": "+243997623306" },
        //     { "displayName": "Yves Buchaguzi", "phoneNumber": "+243998792931" },
        //     { "displayName": "Yves Buchaguzi", "phoneNumber": "+3765858" },
        //     { "displayName": "Yves Buchaguzi", "phoneNumber": "+3765858" },
        //     { "displayName": "Yves Buchaguzi", "phoneNumber": "+3765858" }
        // ];

        // User.findOrCreate({
        //     where: { phone_number: phone_number },
        //     defaults: {
        //         user_names: user_names,
        //         phone_number: phone_number,
        //         birth_date: "",
        //         user_profile: "",
        //         status_information: "Yambi is you and I, toi et moi :)",
        //         notification_token: "",
        //         user_password: "",
        //         user_email: "",
        //         user_address: "",
        //         bio: "",
        //         profession: "",
        //         gender: gender,
        //         country: country,
        //         account_privacy: "0",
        //         account_valid: "1"
        //     }
        // })
        //     .then((new_user) => {

        //         for (let i in contacts) {
        //             const cc = contacts[i].phoneNumber;

        //             User.findOne({ where: { phone_number: cc } })
        //                 .then(user => {
        //                     if (user !== null) {
        //                         user.dataValues.user_names = contacts[i].displayName;

        //                         if(user.dataValues.phone_number !== phone_number) {
        //                             contacts_returned.push(user.dataValues);
        //                         }
        //                     }
        //                 })
        //         }

        //         setTimeout(() => {
        //             response.send({ success: "1", assemble: new_user[0], contacts: contacts_returned });
        //         }, [2000]);
        //     })
        //     .catch((error) => {
        //         response.send({ success: error });
        //     })

        try {
            const user = await UsersModel.findOne({
                _id: phone_number
            });

            if (user !== null) {

                let promise = new Promise((resolve, reject) => {
                    let counter = 0;
                    for (let i in contacts) {
                        const cc = contacts[i].phoneNumber;

                        UsersModel.findOne({ phone_number: cc })
                            .then(userr => {
                                if (userr !== null) {
                                    // user.dataValues.user_names = contacts[i].displayName;

                                    // if(user.dataValues.phone_number !== phone_number) {
                                    const user_assemble_data = {
                                        user_id: userr._id,
                                        user_names: userr.user_names,
                                        phone_number: userr.phone_number,
                                        gender: userr.gender + "",
                                        birth_date: userr.birth_date,
                                        country: userr.country,
                                        user_profile: userr.user_profile,
                                        profession: userr.profession,
                                        bio: userr.bio,
                                        user_email: userr.user_email,
                                        user_address: userr.user_address,
                                        status_information: userr.status_information,
                                        user_password: userr.user_password,
                                        account_privacy: userr.account_privacy + "",
                                        account_valid: userr.account_valid + "",
                                        notification_token: userr.notification_token,
                                        createdAt: userr.createdAt,
                                        updatedAt: userr.updatedAt,
                                    }
                                    contacts_returned.push(user_assemble_data);
                                    // }

                                    // console.log("Not null")
                                }
                                // console.log(userr)
                            })

                        counter = counter + 1;
                        console.log(counter);

                        if (counter === contacts.length) {
                            // resolve(counter);
                            // console.log(counter +" : "+contacts.length);
                            resolve(counter);
                        }
                    }
                })

                promise.then((result) => {

                    setTimeout(() => {
                        if (result === contacts.length) {
                            // console.log(contacts_returned);
                            response.send({ success: "1", assemble: user, contacts: contacts_returned });
                        }
                    }, 2000)
                })

                //         setTimeout(() => {
                //             response.send({ success: "1", assemble: new_user[0], contacts: contacts_returned });
                //         }, [2000]);
            } else {
                try {
                    await UsersModel.create({
                        _id: phone_number,
                        phone_number: phone_number,
                        user_names: user_names,
                        gender: gender,
                        birth_date: "",
                        country: country,
                        user_profile: "",
                        user_email: "",
                        user_address: "",
                        bio: "",
                        profession: "",
                        status_information: "Yambi is you and I, toi et moi :)",
                        user_password: "",
                        notification_token: "",
                        account_privacy: 0,
                        account_valid: 1,
                    })
                        .then(user => {
                            // for (let i in contacts) {
                            // const cc = "+3765858";//contacts[i].phoneNumber;

                            // UsersModel.findOne({ where: { phone_number: cc } })
                            //     .then(userr => {
                            // if (userr.length > 0) {
                            //     user.dataValues.user_names = contacts[i].displayName;

                            //     if(user.dataValues.phone_number !== phone_number) {
                            //         contacts_returned.push(user.dataValues);
                            //     }
                            // }
                            // console.log(userr)

                            let ppromise = new Promise((resolve, reject) => {
                                let counter = 0;
                                for (let i in contacts) {
                                    const cc = contacts[i].phoneNumber;

                                    UsersModel.findOne({ phone_number: cc })
                                        .then(userrr => {
                                            if (userrr !== null) {
                                                // user.dataValues.user_names = contacts[i].displayName;

                                                // if(user.dataValues.phone_number !== phone_number) {
                                                const user_assemble_data = {
                                                    user_id: userrr._id,
                                                    user_names: userrr.user_names,
                                                    phone_number: userrr.phone_number,
                                                    gender: userrr.gender + "",
                                                    birth_date: userrr.birth_date,
                                                    country: userrr.country,
                                                    user_profile: userrr.user_profile,
                                                    profession: userrr.profession,
                                                    bio: userrr.bio,
                                                    user_email: userrr.user_email,
                                                    user_address: userrr.user_address,
                                                    status_information: userrr.status_information,
                                                    user_password: userrr.user_password,
                                                    account_privacy: userrr.account_privacy + "",
                                                    account_valid: userrr.account_valid + "",
                                                    notification_token: userrr.notification_token,
                                                    createdAt: userrr.createdAt,
                                                    updatedAt: userrr.updatedAt,
                                                }

                                                contacts_returned.push(user_assemble_data);
                                                // }

                                                // console.log("Not null")
                                            }
                                            // console.log(userr)
                                        })

                                    counter = counter + 1;
                                    console.log(counter);

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
                                        response.send({ success: "1", assemble: user, contacts: contacts_returned });
                                    }
                                }, 2000)
                            })

                            // })
                            // }

                            //         setTimeout(() => {
                            //             response.send({ success: "1", assemble: new_user[0], contacts: contacts_returned });
                            //         }, [2000]);

                            // console.log(user)

                        });
                } catch (error) {
                    console.log("Error");
                }
            }

        } catch (error) {
            console.log("Error");
        }

    });
}
