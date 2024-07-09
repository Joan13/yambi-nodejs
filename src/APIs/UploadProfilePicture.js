import Yambi from "../Express";
import multer from "multer";
import fs from 'fs';
import { UsersModel } from "../../models/Users";

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        return cb(null, './media/profile_pictures');
    },
    filename: (request, file, cb) => {
        const filename = Date.now() + '-' + Math.round(Math.random() * 1E9);
        return cb(null, `${filename + file.originalname}`);
    }
});

const upload = multer({ storage: storage });

const UploadProfilePicture = async () => {
    Yambi.post("/yambi/API/upload_profile_picture", upload.single('image'), async (request, response) => {

        const user_profile = request.body.user_profile;
        const phone_number = request.body.assemble;

        // console.log(user_profile);

        if (request.file) {
            try {
                fs.unlinkSync('./media/profile_pictures/' + user_profile);
            } catch (err) { }

            UsersModel.findOne({ phone_number: phone_number })
                .then(async contact => {
                    if (contact !== null) {
                        const cc = {
                            user_id: contact._id,
                            user_names: contact.user_names,
                            phone_number: contact.phone_number,
                            gender: contact.gender + "",
                            birth_date: contact.birth_date,
                            country: contact.country,
                            user_profile: contact.user_profile,
                            profession: contact.profession,
                            bio: contact.bio,
                            user_email: contact.user_email,
                            user_address: contact.user_address,
                            status_information: contact.status_information,
                            user_password: contact.user_password,
                            account_privacy: contact.account_privacy + "",
                            account_valid: contact.account_valid + "",
                            notification_token: contact.notification_token,
                            createdAt: contact.createdAt,
                            updatedAt: contact.updatedAt,
                        }

                        try {
                            await UsersModel.findByIdAndUpdate(cc.phone_number, mm);
                        } catch (error) { }
                    }
                });

            response.send({ message: "1", user_profile: request.file.filename, assemble: phone_number });

        } else {
            response.send({ message: "0" });
        }
    });
}

export default UploadProfilePicture;

