import { User, UsersModel } from "../../models/users";
import Yambi from "../express";
import { connection } from "../mysql";

export default function SyncContacts() {
    Yambi.post("/yambi/API/sync_contacts", (request, response) => {

        const contacts = request.body.contacts;
        let contacts_returned = [];

            let ppromise = new Promise((resolve, reject) => {
                let counter = 0;
                for (let i in contacts) {
                    const cc = contacts[i].phoneNumber;

                    UsersModel.findOne({ phone_number: cc })
                        .then(contact => {
                            if (contact !== null) {
                                // user.dataValues.user_names = contacts[i].displayName;

                                // if(user.dataValues.phone_number !== phone_number) {
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
                        // socket.emit('update_contacts', contacts_returned);
                        response.send({contacts:contacts_returned});
                    }
                }, 2000)
            })
    });
}
