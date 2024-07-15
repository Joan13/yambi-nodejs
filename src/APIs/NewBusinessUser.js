import { BusinessUsersModel } from "../../models/BusinessUsers";
import Yambi from "../Express";

export default function NewBusinessUser() {
    Yambi.post("/yambi/API/new_business_user", async (request, response) => {
        const message = request.body.business_user;

        const business_user = {
            _id: message._id,
            business_id: message.business_id,
            phone_number: message.phone_number,
            sales_point_id: message.sales_point_id,
            user: message.user,
            level: message.level,
            user_active: 1
        }

        try {
            await BusinessUsersModel.create(business_user)
                .then(bu => {
                    response.send({ success: "1" });
                })
        } catch (error) {
            response.send({ success: "0" });
        }

    });
}
