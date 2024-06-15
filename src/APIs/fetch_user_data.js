import Yambi from "../express";
import { User } from '../../models/users';

export default function FetchUserData() {
    Yambi.post("/yambi/API/fetch_user_data", (request, response) => {
        let user = request.body.user;
        User.findAll({ where: { phone_number: user } })
            .then((userData) => {
                response.send({ success: "1", assemble: userData });
            })
            .catch((error) => {
                console.log("Error while sending the message" + error);
            })
    });
}
