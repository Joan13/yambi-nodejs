import Yambi from "../Express";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        return cb(null, './media/picture_messages');
    },
    filename: (request, file, cb) => {
        const filename = Date.now() + '-' + Math.round(Math.random() * 1E9);
        return cb(null, `${filename + file.originalname}`);
    }
});

const upload = multer({ storage: storage });

const SendPictureMessage = () => {
    Yambi.post("/yambi/API/upload_picture", upload.single('image'), async (request, response) => {

        // const user_profile = request.body.user_profile;
        // const phone_number = request.body.assemble;

        // console.log(request.file.filename);

        // if (request.file) {
        //     try {
        //         fs.unlinkSync('./media/profile_pictures/' + user_profile);
        //     } catch (err) { }

        //     await User.update({ user_profile: request.file.filename }, {
        //         where: {
        //             phone_number: phone_number,
        //         },
        //     });
        // console.log("ok")

        // response.send("1");

        // } else {
        response.send({ message: "1", file_name: request.file.filename });
        // }
    });
}

export default SendPictureMessage;

