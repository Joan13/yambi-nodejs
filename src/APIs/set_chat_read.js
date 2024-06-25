import { Messages } from "../../models/Messages";
import Yambi from "../Express";

export default function SetChatRead() {
    Yambi.post("/yambi/API/set_message_seen", (request, response) => {
        const message = request.body.message;

        Messages.update({ message_read: "1" },
            { where: { token: message.token } })
            .then(() => {
                response.send({ success: "1", token: message.token });
            })
            .catch((error) => {
                console.log("Error while sending the message" + error);
            })
    });
}
