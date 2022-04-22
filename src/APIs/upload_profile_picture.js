import { Messages } from "../../models/messages";
import Yambi from "../express";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../models/users';
let fileName = '';

const storage = multer.diskStorage({
    destination: (request, file, cb) => { cb(null, './media/profile_pictures/') },
    filename: (request, file, cb) => {
        const { originalname } = file;
        fileName = `${uuidv4()}-${originalname}`;
        cb(null, fileName);
    }
});

const upload = multer({ storage });

export default function UploadProfilePicture() {
    Yambi.post("/yambi/API/upload_profile_picture", upload.single('image'), (request, response) => {
        const phone = request.body.phone_number;

        if (fileName !== '') {
            User.update({ user_profile: fileName },
                { where: { phone_number: phone } })
                .then(() => {
                    response.send({ success: "1", filename:fileName });
                })
                .catch((error) => { response.send({ success: 0 }); })
        } else {
            response.send({ success: 0 });
        }
    });
}