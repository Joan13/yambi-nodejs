import Yambi from "../Express";
import multer from "multer";
import fs from 'fs';
import { User } from "../../models/Users";

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

const UploadProfilePicture = () => {
    Yambi.post("/yambi/API/upload_profile_picture", upload.single('image'), async (request, response) => {

        const user_profile = request.body.user_profile;
        const phone_number = request.body.assemble;

        if (request.file) {
            try {
                fs.unlinkSync('./media/profile_pictures/' + user_profile);
            } catch (err) { }

            await User.update({ user_profile: request.file.filename }, {
                where: {
                    phone_number: phone_number,
                },
            });

            response.send({ message: "1", user_profile: request.file.filename, assemble: phone_number });

        } else {
            response.send({ message: "0" });
        }
    });
}

export default UploadProfilePicture;

