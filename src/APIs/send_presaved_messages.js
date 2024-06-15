import { Messages } from "../../models/messages";
import Yambi from "../express";

export default function SendPresavedMessages() {
    Yambi.post("/yambi/API/send_presaved_message", (request, response) => {

        let msg = request.body.message;
        console.log(msg);
        
        Messages.findOrCreate({
            where: { token: msg.token },
            defaults: {
                token: msg.token,
                sender: msg.sender,
                receiver: msg.receiver,
                gender: msg.gender,
                main_text_message: msg.main_text_message,
                response_to: msg.response_to,
                response_to_text: msg.response_to_text,
                response_to_token: msg.response_to_token,
                message_read: '0',
                date_creation: msg.date_creation,
                message_effect: msg.message_effect,
                deleted: "0"
            }
        })
            .then((new_message) => {
                response.send({ success: "1", token: msg.token });
            })
            .catch((error) => {
                console.log("Error while sending the message" + error);
            })
    });
}