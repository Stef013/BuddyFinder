package data.interfaces;

import models.Message;

import java.util.List;

public interface IMessageRepository
{
    boolean insertMessage(Message message);
    List<Message> getMessages(int recieverid);
    boolean deleteMessage(int messageid);
}
