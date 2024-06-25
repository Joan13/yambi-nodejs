import Yambi from "../Express";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        return cb(null, './media/voice_notes');
    },
    filename: (request, file, cb) => {
        // const filename = Date.now() + '-' + Math.round(Math.random() * 1E9);
        return cb(null, `${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

const UploadVoiceNote = () => {
    Yambi.post("/yambi/API/upload_voice_note", upload.single('voice_note'), async (request, response) => {
        response.send("1");
    });
}

export default UploadVoiceNote;

