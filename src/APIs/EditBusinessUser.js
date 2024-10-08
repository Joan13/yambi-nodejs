import { BusinessDataWatcherModel } from "../../models/BusinessDataWatcher";
import { BusinessUsersModel } from "../../models/BusinessUsers";
import Yambi from "../Express";

export default function EditBusinessUser() {
    Yambi.post("/yambi/API/edit_business_user", async (request, response) => {
        const message = request.body.business_user;
        const flag = request.body.flag;

        if (flag === 0) {
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
                await BusinessUsersModel.findByIdAndUpdate(business_user._id, business_user)
                    .then(async bu => {
                        response.send({ success: "1" });
                    })
            } catch (error) {
                response.send({ success: "0" });
            }
        } else {
            try {
                await BusinessUsersModel.deleteOne({ _id: message._id });
                response.send({ success: "1" });
            } catch (error) {
                console.log(error)
                response.send({ success: "0" });
            }
        }
    });
}

