import { BusinessModel } from "../../models/Business";
import { BusinessUsersModel } from "../../models/BusinessUsers";
import Yambi, { randomString, renderDateUpToMilliseconds } from "../Express";

export default function NewBusiness() {

    Yambi.post("/yambi/API/new_business", async (request, response) => {
        let business = request.body.business;
        // console.log(message);

        const business_user = {
            _id: randomString(5) + renderDateUpToMilliseconds(),
            business_id: business._id,
            phone_number: business.phone_number,
            sales_point_id: "",
            user: business.phone_number,
            level: 1,
            user_active: 1
        }

        try {
            await BusinessModel.create({
                _id: business._id,
                phone_number: business.phone_number,
                business_name: business.business_name,
                slogan: business.slogan,
                description_service: business.description_service,
                category: business.category,
                keywords: business.keywords,
                currency: business.currency,
                logo: business.logo,
                phones: business.phones,
                emails: business.emails,
                background: business.background,
                national_number: business.national_number,
                national_id: business.national_id,
                business_active: 0,
                business_address: business.business_address,
                business_visible: 0,
                website: business.website,
                other_links: business.other_links,
                yambi: business.yambi,
                valid_until: ""
            })
                .then(async newBusiness => {
                    await BusinessUsersModel.create(business_user);
                    response.send({ business: newBusiness, business_user: business_user });
                })
        } catch (error) {
            console.log(error);
        }

    });
}

