import { MessagesModel } from "../../models/Messages";

const FindUserMessages = async (phone_number) => {
    try {
        const messages = await MessagesModel.find({$where:"this.receiver == " + phone_number + " && this.message_read == 0 || this.message_read == 4"});
        return messages;

    } catch (error) {
        console.log(error);
    }
}

export default FindUserMessages;
