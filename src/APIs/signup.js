import { User } from "../../models/users";
import Yambi from "../express";

export default function Signup() {
    Yambi.post("/yambi/API/signup", (request, response) => {

        const user_names = request.body.names;
        const phone_number = request.body.phone_number;
        const gender = request.body.gender;
        const country = request.body.country;

        User.findOrCreate({
            where: { phone_number: phone_number },
            defaults: {
                user_names: user_names,
                phone_number: phone_number,
                birth_date: "",
                user_profile: "",
                status_information: "Yambi is you and I, toi et moi :)",
                user_password: "",
                profession: "",
                gender: gender,
                country: country,
                account_privacy: "0",
                account_valid: "1"
            }
        })
            .then((new_user) => {
                response.send({ success: "1", assemble: new_user });
            })
            .catch((error) => {
                response.send({ success: "0" });
            })
    });
}
