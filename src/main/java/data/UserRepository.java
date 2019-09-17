package data;

import models.User;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;

public class UserRepository
{
    @PersistenceContext
    public static EntityManagerFactory emf;
    public static EntityManager em;

    private void openConnection()
    {
        if(emf == null && em == null)
        {
            emf = Persistence.createEntityManagerFactory("userPU");
            em = emf.createEntityManager();
        }
        else if(!em.isOpen())
        {
            emf = Persistence.createEntityManagerFactory("userPU");
            em = emf.createEntityManager();
        }
    }

    public boolean insertUser(User user)
    {
        try{
            openConnection();
            em.getTransaction().begin();

            em.persist(user);
            em.getTransaction().commit();
            emf.close();

            return true;
        }
        catch(Exception ex)
        {
            return false;
        }
    }
}
