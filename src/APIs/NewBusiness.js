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
                slogan: "",
                description_service: business.description_service,
                category: business.category,
                keywords: "",
                logo: "",
                phones: "",
                emails: "",
                background: "",
                business_active: 0,
                business_address: business.business_address,
                business_visible: 0,
                website: "",
                other_links: "",
                yambi: ""
            })
                .then(newBusiness => {
                    response.send({ business: newBusiness });
                })
        } catch (error) {
            console.log(error);
        }

    });
}

