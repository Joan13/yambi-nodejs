import { Messages } from "../../models/messages";
import Yambi from "../express";

export default function FindUserMessages() {
    Yambi.post("/yambi/API/find_user_messages", (request, response) => {
        // let user = request.body.user;
        // Messages.findAll({
        //     where: { receiver: user, message_read:"0"}
        // })
        //     .then((messages) => {
        //         response.send({ success: "1", data: messages });
        //     })
        //     .catch((error) => {
        //         console.log("Error while sending the message" + error);
        //     })
    });
}