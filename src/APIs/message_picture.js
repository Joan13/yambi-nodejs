import { Messages } from "../../models/messages";
import Yambi from "../express";
import multer from "multer";
let destination = multer({dest:'./../../media/picture_messages'});

export default function MessagePicture() {
    Yambi.post("/yambi/API/message_picture",destination.single('fileData'), (request, response, next) => {
        // console.log(request.file);//this will be automatically set by multer
        // console.log(request.body);
        //below code will read the data from the upload folder. Multer     will automatically upload the file in that folder with an  autogenerated name
    //     fs.readFile(req.file.path,(err, contents)=> {
    //      if (err) {
    //      console.log('Error: ', err);
    //     }else{
    //      console.log('File contents ',contents);
    //     }
    //    });
    response.send({success:'1'})
    });
}