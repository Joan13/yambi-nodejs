import { User } from "../../models/users";
import Yambi from "../express";
import { connection } from "../mysql";

export default function SyncContacts() {
    Yambi.post("/yambi/API/sync_contacts", (request, response) => {

        const contacts = request.body.contacts;
        let contacts_returned = [];

        // User.findOrCreate({
        //     where: { phone_number: phone_number },
        //     defaults: {
        //         user_names: user_names,
        //         phone_number: phone_number,
        //         birth_date: "",
        //         user_profile: "",
        //         status_information: "",
        //         user_password: "",
        //         gender: gender,
        //         country: country,
        //         account_privacy: "0",
        //         account_valid: "1"
        //     }
        // })
        //     .then((new_user) => {
        //         response.send({ message: "1", assemble: new_user });
        //     })
        //     .catch((error) => {
        //         response.send({ message: "0" });
        //     })
        let counter = 0;

        // contacts.forEach((contact,callback) => {
        //     counter = counter+1;
        //     console.log(contact)
            // contacts_returned.push(contact);
            // User.findOne({ where: {phone_number: contact.phoneNumber} }).then((user) => {
            //     // User.findOne({ where: {phone_number: "+243976323470"} }).then(user => {
            //     // project will be the first entry of the Projects table with the title 'aProject' || null
            //     // user = JSON.stringify(user);
            //     if (user !== null) {
            //         contacts_returned.push(user);
            //         console.log(user)
            //         // response.send({"data":user});
            //     }
            //   })
            //   .catch((e) => {
            //       response.send({"message":"0"});
            //   })
        // });

        for (let i in contacts) {
            // console.log(contacts[i])
            counter = counter+1;
            let found_contact = [];
                User.findOne({ where: {phone_number: contacts[i].phoneNumber} }).then(user => {
                    // User.findOne({ where: {phone_number: "+243976323470"} }).then(user => {
                    // project will be the first entry of the Projects table with the title 'aProject' || null
                    user = JSON.stringify(user);
                    // if (user !== null) {
                        // found_contact.push({"user_id":user.user_id,phone_number:user.phone_number});
                        found_contact.push(user)
                        // response.send({"data":user});
                    // }
    
                    // console.log(user)
                  })
                  .catch((e) => {
                      response.send({"message":"0"});
                  })

        //     connection.query("SELECT * FROM yb_table_users WHERE phone_number=?", [contacts[i].phoneNumber], (err, result) => {
		// 	// result = JSON.stringify({ result });
		// 	// result = JSON.parse(result);

            
		// 	let rows = Object.values(JSON.parse(JSON.stringify(result)));
		// 	let row = rows[0];

        //     if (row !== undefined) {
        //         contacts_returned.push(row);
        //     }
		// 	if (err) throw err;
		// 	// console.log(result[0].id_zs);
		// });

        contacts_returned.push(found_contact);
        }

        // console.log(contacts_returned)

        // if (contacts.length === counter) {
            response.send({"data":contacts_returned});
        // }
    });
}
