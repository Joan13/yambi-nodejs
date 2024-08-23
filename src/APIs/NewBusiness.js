import { BusinessModel } from "../../models/Business";
import { BusinessUsersModel } from "../../models/BusinessUsers";
import Yambi, { randomString, renderDateUpToMilliseconds } from "../Express";

export default function NewBusiness() {

    const save_user = async (user) => {
        try {
            await BusinessUsersModel.create(user);
        } catch (error) { }
    }

    Yambi.post("/yambi/API/new_business", async (request, response) => {
        let business = request.body.business;
        // console.log(message);

        const business_user = {
            _id: randomString(5) + renderDateUpToMilliseconds(),
            user_name: business.user_name,
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
                tax_number: business.tax_number,
                country: business.country,
                state: business.state,
                city: business.city,
                business_active: 0,
                business_address: business.business_address,
                business_visible: 0,
                website: business.website,
                other_links: business.other_links,
                yambi: business.yambi,
                valid_until: ""
            })
                .then(newBusiness => {

                    save_user(business_user);

                    setTimeout(() => {
                        response.send({ business: newBusiness, business_user: business_user });
                    }, 500);
                })
        } catch (error) {
            console.log(error);
        }

    });
}

