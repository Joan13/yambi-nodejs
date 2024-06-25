import { SellsPointModel } from "../../models/SellsPoint";
import Yambi from "../Express";

export default function NewSellsPoint() {

    Yambi.post("/yambi/API/new_sells_point", async (request, response) => {
        let sells_point = request.body.sells_point;
        // console.log(message);

        try {
            await SellsPointModel.create({
                _id: sells_point._id,
                phone_number: sells_point.phone_number,
                business_id: sells_point.business_id,
                sells_point_name: sells_point.sells_point_name,
                slogan: "",
                description_service: sells_point.description_service,
                category: sells_point.category,
                keywords: "",
                logo: "",
                phones: "",
                emails: "",
                background: "",
                sells_point_active: 0,
                sells_point_address: sells_point.sells_point_address,
                sells_point_visible: 0,
                website: "",
                other_links: "",
                yambi: ""
            })
                .then(new_sells_point => {
                    response.send({ new_sells_point: new_sells_point });
                })
        } catch (error) {
            console.log(error);
        }

    });
}

