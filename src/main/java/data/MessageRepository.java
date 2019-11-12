package data;

import models.Message;

import javax.persistence.*;
import java.util.List;

public class MessageRepository
{
    @PersistenceContext
    public static EntityManagerFactory emf;
    public static EntityManager em;

    private void openConnection()
    {
        if (emf == null && em == null)
        {
            emf = Persistence.createEntityManagerFactory("buddyfinderPU");
            em = emf.createEntityManager();
        } else if (!em.isOpen())
        {
            emf = Persistence.createEntityManagerFactory("buddyfinderPU");
            em = emf.createEntityManager();
        }
    }

    public boolean insertMessage(Message message)
    {
        try{
            openConnection();
            em.getTransaction().begin();

            em.persist(message);
            em.getTransaction().commit();
            emf.close();

            return true;
        }
        catch(Exception ex)
        {
            emf.close();
            return false;
        }
    }

    public List<Message> getMessages(int recieverid)
    {
        try{
            openConnection();
            em.getTransaction().begin();
            String sql = "Select * FROM buddyfinder_messages WHERE RecieverID = ?1";

            Query query = em.createNativeQuery(sql, Message.class);
            query.setParameter(1, recieverid);
            List<Message> messages = query.getResultList();
            emf.close();

            return messages;
        }
        catch(Exception ex)
        {
            emf.close();
            return null;
        }
    }
}
