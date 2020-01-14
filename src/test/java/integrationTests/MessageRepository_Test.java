package integrationTests;

import data.MessageRepository;
import data.UserRepository;
import models.Message;
import models.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.Assert.*;

public class MessageRepository_Test
{
    private MessageRepository messageRepo;
    private UserRepository userRepo;
    private User testSender;
    private User testReciever;

    @BeforeEach
    public void setup()
    {
        messageRepo = new MessageRepository("testPU");
        userRepo = new UserRepository("testPU");

        testSender = new User("testSender", "Password");
        userRepo.insertUser(testSender);
        testReciever = new User("testReciever", "Password");
        userRepo.insertUser(testReciever);
    }

    @AfterEach
    public void end()
    {
        messageRepo.emf.close();
        userRepo.emf.close();
    }

    @Test
    public void test_Insert_Message()
    {
        Message message = new Message(testReciever, testSender, testSender.getUsername(), "test bericht.", false);
        boolean actualResult = messageRepo.insertMessage(message);

        assertTrue(actualResult);
    }

    @Test
    public void test_Get_Message()
    {
        String expectedMessage1 = "Dit is een test bericht.";
        String expectedMessage2 = "Dit is ook een test bericht.";

        Message message1 = new Message(testReciever, testSender, testSender.getUsername(), expectedMessage1, false);
        Message message2 = new Message(testReciever, testSender, testSender.getUsername(), expectedMessage2, false);
        messageRepo.insertMessage(message1);
        messageRepo.insertMessage(message2);

        List<Message> messages = messageRepo.getMessages(testReciever.getUserId());

        assertEquals(2, messages.size());
        assertEquals(expectedMessage1, messages.get(0).getMessage());
        assertEquals(expectedMessage2, messages.get(1).getMessage());
    }

    @Test
    public void test_Delete_Message()
    {
        Message message = new Message(testReciever, testSender, testSender.getUsername(), "test bericht.", false);
        messageRepo.insertMessage(message);

        List<Message> messages = messageRepo.getMessages(testReciever.getUserId());
        assertEquals(1, messages.size());

        messageRepo.deleteMessage(messages.get(0).getMessageid());

        messages = messageRepo.getMessages(testReciever.getUserId());
        assertEquals(0, messages.size());
    }
}
