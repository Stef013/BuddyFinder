package data;

import data.interfaces.IMessageRepository;
import data.interfaces.IRepository;
import models.Message;

import javax.persistence.*;
import java.util.List;

public class MessageRepository implements IMessageRepository, IRepository
{
    @PersistenceContext
    private static EntityManagerFactory emf;
    private static EntityManager em;

    public MessageRepository(String persistenceUnit)
    {
        emf = Persistence.createEntityManagerFactory(persistenceUnit);
        em = emf.createEntityManager();
    }

    public void closeConnection()
    {
        emf.close();
    }

    public boolean insertMessage(Message message)
    {
        try{
            em.getTransaction().begin();

            em.persist(message);
            em.getTransaction().commit();

            return true;
        }
        catch(Exception ex)
        {
            return false;
        }
    }

    public List<Message> getMessages(int recieverid)
    {
        try{
            String sql = "Select * FROM buddyfinder_messages2 WHERE RecieverID = ?1";

            Query query = em.createNativeQuery(sql, Message.class);
            query.setParameter(1, recieverid);
            List<Message> messages = query.getResultList();

            return messages;
        }
        catch(Exception ex)
        {
            return null;
        }
    }

    public boolean deleteMessage(int messageid)
    {
        try{
            em.getTransaction().begin();
            Message message = em.find(Message.class, messageid );
            em.remove(message);
            em.getTransaction().commit();
            return true;
        }
        catch(Exception ex)
        {
            return false;
        }
    }
}
