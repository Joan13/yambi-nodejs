import { Messages } from "../../models/messages";
import Yambi from "../express";

export default function FindStatusMessages() {

    Yambi.post("/yambi/API/find_status_messages", (request, response) => {
        let message = request.body.message;
        // console.log(message);
        Messages.findAll({
            where: { token: message.token}
        })
            .then((msg) => {
                if(msg.message_read !== '0' && msg.message_read !== message.message_read) {
                    response.send({ success: "1", data: msg });
                }

                else {
                    response.send({ success: "2" });
                }
            })
            .catch((error) => {
                console.log("Error while sending the message" + error);
                response.send({ success: "0" });
            })
    });
}
