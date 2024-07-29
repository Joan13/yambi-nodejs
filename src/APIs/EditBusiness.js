import { BusinessModel } from "../../models/Business";
import { BusinessUsersModel } from "../../models/BusinessUsers";
import Yambi, { randomString, renderDateUpToMilliseconds } from "../Express";

export default function EditBusiness() {

    Yambi.post("/yambi/API/edit_business", async (request, response) => {
        const business = request.body.business;
        // console.log(message);

        // const business_user = {
        //     _id: randomString(5) + renderDateUpToMilliseconds(),
        //     business_id: business._id,
        //     phone_number: business.phone_number,
        //     sales_point_id: "",
        //     user: business.phone_number,
        //     level: 1,
        //     user_active: 1
        // }

        // console.log(business)

        try {
            await BusinessModel.findByIdAndUpdate(business._id, {
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
                business_active: business.business_active,
                business_address: business.business_address,
                business_visible: business.business_visible,
                website: business.website,
                other_links: business.other_links,
                yambi: business.yambi,
                valid_until: business.valid_until})
                .then(async newBusiness => {
                    // await BusinessUsersModel.findByIdAndUpdate(business._id, business_user, { upsert: true });
                    // console.log(1);
                    response.send({ business: newBusiness, business_user: {}, success:"1" });
                })
        } catch (error) {
            console.log(error);
        }

    });
}

