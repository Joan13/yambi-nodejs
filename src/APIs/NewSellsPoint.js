import { SellsPointModel } from "../../models/SellsPoint";
import Yambi, { randomString, renderDateUpToMilliseconds } from "../Express";

export default function NewSellsPoint() {

    Yambi.post("/yambi/API/new_sells_point", async (request, response) => {
        let sells_point = request.body.sells_point;
        // console.log(message);

        // const business_user = {
        //     _id: randomString(5) + renderDateUpToMilliseconds(),
        //     business_id: sells_point.business_id,
        //     phone_number: sells_point.phone_number,
        //     sales_point_id: sells_point._id,
        //     user: sells_point.phone_number,
        //     level: 1,
        //     user_active: 1
        // }

        try {
            await SellsPointModel.create({
                _id: sells_point._id,
                phone_number: sells_point.phone_number,
                business_id: sells_point.business_id,
                sells_point_name: sells_point.sells_point_name,
                slogan: sells_point.slogan,
                description_service: sells_point.description_service,
                category: sells_point.category,
                keywords: sells_point.keywords,
                logo: sells_point.logo,
                phones: sells_point.phones,
                emails: sells_point.emails,
                country: sells_point.country,
                background: sells_point.background,
                sells_point_active: 1,
                sells_point_address: sells_point.sells_point_address,
                sells_point_visible: 1,
                website: sells_point.website,
                other_links: sells_point.other_links,
                yambi: sells_point.yambi
            })
                .then(new_sells_point => {
                    // await BusinessUsersModel.create(business_user);
                    response.send({ new_sells_point: new_sells_point });
                })
        } catch (error) {
            // console.log(error);
        }

    });
}

