import { BusinessModel } from "../../models/Business";
import Yambi from "../Express";

export default function NewBusiness() {

    Yambi.post("/yambi/API/new_business", async (request, response) => {
        let business = request.body.business;
        // console.log(message);

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
                yambi: business.yambi
            })
                .then(newBusiness => {
                    response.send({ business: newBusiness });
                })
        } catch (error) {
            console.log(error);
        }

    });
}

