import FindUserMessages from './APIs/find_user_messages';
import SendPresavedMessages from './APIs/send_presaved_messages';
import SetChatRead from './APIs/set_chat_read';
import SetMessagesReceived from './APIs/set_messages_received';
import Signup from './APIs/signup';
import SocketMessage from './APIs/socket';
import FindStatusMessages from './APIs/status_messages';

Signup();
SocketMessage();
SendPresavedMessages();
FindUserMessages();
SetChatRead();
SetMessagesReceived();
FindStatusMessages();
