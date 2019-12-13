package data;

import models.User;
import logic.Hashing;
import javax.persistence.*;
import java.util.Collection;
import java.util.List;

public class UserRepository
{
    private Hashing hashing;

    @PersistenceContext
    public static EntityManagerFactory emf;
    public static EntityManager em;

    private void openConnection()
    {
        if(emf == null && em == null)
        {
            emf = Persistence.createEntityManagerFactory("buddyfinderPU");
            em = emf.createEntityManager();
        }
        else if(!em.isOpen())
        {
            emf = Persistence.createEntityManagerFactory("buddyfinderPU");
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

            hashing = new Hashing();
            String hashedPassword = hashing.hash(user.getPassword());
            user.setPassword(hashedPassword);

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
            hashing = new Hashing();

            openConnection();
            //em.getTransaction().begin();

            String sql = "Select * FROM buddyfinder_users2 WHERE Username = ?1 AND Password = ?2";
            Query query = em.createNativeQuery(sql, User.class);
            query.setParameter(1, user.getUsername());
            query.setParameter(2, hashing.hash(user.getPassword()));
            User userdata = (User)query.getSingleResult();
            emf.close();

            return userdata;
        }
        catch(Exception ex)
        {
            emf.close();
            return null;
        }
    }

    public User getProfile(String username)
    {
        try{
            openConnection();
            //em.getTransaction().begin();
            String sql = "Select * FROM buddyfinder_users2 WHERE Username = ?1";
            Query query = em.createNativeQuery(sql, User.class);
            query.setParameter(1, username);
            User userdata = (User)query.getSingleResult();
            userdata.setPassword(null);
            System.out.println(userdata.getHobby1());
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

    public boolean addBuddy(int userid, int buddyid)
    {
        try{
            openConnection();
            em.getTransaction().begin();

            User user = em.find(User.class, userid);
            User buddy = em.find(User.class, buddyid);

            user.setBuddies(buddy);
            buddy.setBuddies(user);

            em.merge(user);
            em.merge(buddy);

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

    public boolean getBuddies(int userid)
    {
        try
        {
            openConnection();

            String sql = "Select  FROM buddyfinder_users2 e LEFT JOIN FETCH e.buddies WHERE USERID = ?1";

            Query query = em.createNativeQuery(sql, User.class);
            query.setParameter(1, userid);

            List<User> allUsers = query.getResultList();
            System.out.println(allUsers);



            emf.close();
            return true;
        } catch (Exception ex)
        {
            emf.close();
            return false;
        }
    }
}
