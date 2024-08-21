import { BusinessDataWatcherModel } from "../../models/BusinessDataWatcher";
import { BusinessUsersModel } from "../../models/BusinessUsers";
import Yambi from "../Express";

export default function NewBusinessUser() {
    Yambi.post("/yambi/API/edit_business_user", async (request, response) => {
        const message = request.body.business_user;

        const business_user = {
            _id: message._id,
            business_id: message.business_id,
            phone_number: message.phone_number,
            sales_point_id: message.sales_point_id,
            user: message.user,
            level: message.level,
            user_active: message.user_active,
            user_name: message.user_name
        }

        try {
            await BusinessUsersModel.findByIdAndUpdate(business_user)
                .then(async bu => {
                    response.send({ success: "1" });
                })
        } catch (error) {
            response.send({ success: "0" });
        }

    });
}

