package data;

import models.User;

import javax.persistence.*;

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
        if (getUserData(user) != null)
        {
            return false;
        }
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
            emf.close();
            return false;
        }
    }

    public User getUserData(User user)
    {
        try{
            openConnection();
            em.getTransaction().begin();

            String sql = "Select * FROM buddyfinder_users WHERE Username = ?1 AND Password = ?2";

            Query query = em.createNativeQuery(sql, User.class);
            query.setParameter(1, user.getUsername());
            query.setParameter(2, user.getPassword());
            User userdata = (User)query.getSingleResult();
            System.out.println(userdata.getHobby1());
            //em.getTransaction().commit();
            emf.close();

            return userdata;
        }
        catch(Exception ex)
        {
            emf.close();
            return null;
        }
    }

    public boolean update(User user)
    {
        System.out.println(user.getUserId());
        try{
            openConnection();
            em.getTransaction().begin();
            //User userobject = em.(user.getUserId());

            em.merge(user);
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
}
