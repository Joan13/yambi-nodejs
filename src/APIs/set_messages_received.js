import { Messages } from "../../models/Messages";
import Yambi from "../Express";

export default function SetMessagesReceived() {
    Yambi.post("/yambi/API/set_message_received", (request, response) => {
        const message = request.body.message;

        Messages.update({ message_read: "3" },
            { where: { token: message.token } })
            .then(() => { response.send({success:'1'}) })
            .catch((error) => {
                console.log("Error while sending the message" + error);
            })
    });
}