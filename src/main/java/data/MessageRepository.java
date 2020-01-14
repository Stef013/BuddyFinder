package data;

import data.interfaces.IMessageRepository;
import data.interfaces.IRepository;
import models.Message;

import javax.persistence.*;
import java.util.List;

public class MessageRepository implements IMessageRepository
{
    private String persistenceUnit;

    @PersistenceContext
    public static EntityManagerFactory emf;
    public static EntityManager em;

    public MessageRepository(String persistenceUnit)
    {
        //this.persistenceUnit = persistenceUnit;
        emf = Persistence.createEntityManagerFactory(persistenceUnit);
        em = emf.createEntityManager();
    }

    /*public void openConnection()
    {
        if(emf == null && em == null)
        {
            emf = Persistence.createEntityManagerFactory(persistenceUnit);
            em = emf.createEntityManager();
        }
        else if(!em.isOpen())
        {
            emf = Persistence.createEntityManagerFactory(persistenceUnit);
            em = emf.createEntityManager();
        }
    }*/

    public boolean insertMessage(Message message)
    {

        try{
            //openConnection();
            em.getTransaction().begin();

            em.persist(message);
            em.getTransaction().commit();
            //emf.close();

            return true;
        }
        catch(Exception ex)
        {
            //emf.close();
            return false;
        }
    }

    public List<Message> getMessages(int recieverid)
    {
        try{
            //openConnection();
            String sql = "Select * FROM buddyfinder_messages2 WHERE RecieverID = ?1";

            Query query = em.createNativeQuery(sql, Message.class);
            query.setParameter(1, recieverid);
            List<Message> messages = query.getResultList();
            //emf.close();
            /*for(Message m : messages)
            {
                m.getReciever().clearBuddies();
                m.getSender().clearBuddies();
            }*/

            return messages;
        }
        catch(Exception ex)
        {
            //emf.close();
            return null;
        }
    }

    public boolean deleteMessage(int messageid)
    {
        try{
            //openConnection();
            em.getTransaction().begin();
            Message message = em.find(Message.class, messageid );
            em.remove(message);
            em.getTransaction().commit();
            //emf.close();
            /*em.getTransaction().begin();
            String sql = "DELETE FROM buddyfinder_messages2 WHERE MessageID = ?1";

            Query query = em.createNativeQuery(sql);
            query.setParameter(1, messageid);

            query.executeUpdate();
            em.getTransaction().commit();*/
            return true;
        }
        catch(Exception ex)
        {
            //emf.close();
            return false;
        }
    }
}
