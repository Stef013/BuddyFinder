package data;

import data.interfaces.IRepository;
import data.interfaces.IUserRepository;
import models.Acceptrequest;
import models.User;
import logic.Hashing;
import javax.persistence.*;
import java.util.List;

public class UserRepository implements IUserRepository, IRepository
{
    private Hashing hashing;

    @PersistenceContext
    private static EntityManagerFactory emf;
    private static EntityManager em;

    public UserRepository(String persistenceUnit)
    {
        emf = Persistence.createEntityManagerFactory(persistenceUnit);
        em = emf.createEntityManager();
    }

    @Override
    public void closeConnection()
    {
        emf.close();
    }

    public boolean insertUser(User user)
    {
        if (getProfile(user.getUsername()) != null)
        {
            return false;
        }
        try{
            hashing = new Hashing();
            String hashedPassword = hashing.hash(user.getPassword());
            user.setPassword(hashedPassword);

            em.getTransaction().begin();

            em.persist(user);
            em.getTransaction().commit();

            return true;
        }
        catch(Exception ex)
        {
            return false;
        }
    }

    public User getUserData(User user)
    {
        try{
            hashing = new Hashing();

            String sql = "Select * FROM buddyfinder_users2 WHERE Username = ?1 AND Password = ?2";
            Query query = em.createNativeQuery(sql, User.class);
            query.setParameter(1, user.getUsername());
            query.setParameter(2, hashing.hash(user.getPassword()));
            User userdata = (User)query.getSingleResult();

            return userdata;
        }
        catch(Exception ex)
        {
            return null;
        }
    }

    public User getProfile(String username)
    {
        try{
            String sql = "Select UserID, UserName, Firstname, Lastname, City, Country, Description, Hobby1, Hobby2, Hobby3 " +
                    "FROM buddyfinder_users2 WHERE Username = ?1";
            Query query = em.createNativeQuery(sql, User.class);
            query.setParameter(1, username);
            User profile = (User)query.getSingleResult();

            return profile;
        }
        catch(Exception ex)
        {
            return null;
        }
    }

    public boolean update(User user)
    {
        try{
            em.getTransaction().begin();

            em.merge(user);
            em.getTransaction().commit();

            return true;
        }
        catch(Exception ex)
        {
            return false;
        }
    }

    public boolean addBuddy(Acceptrequest acceptrequest)
    {
        try{
            em.getTransaction().begin();
            User user = em.find(User.class, acceptrequest.getUserid());
            User buddy = em.find(User.class, acceptrequest.getBuddyid());
            user.setBuddies(buddy);
            buddy.setBuddies(user);
            em.merge(user);
            em.merge(buddy);
            em.getTransaction().commit();

            return true;
        }
        catch(Exception ex)
        {
            return false;
        }
    }

    public List<User> getBuddies(int userid)
    {
        try
        {
            String sql = "SELECT buddyfinder_users2.USERID, buddyfinder_users2.USERNAME, buddyfinder_users2.FIRSTNAME, " +
                    "buddyfinder_users2.LASTNAME " +
                    "FROM buddyfinder_buddies " +
                    "INNER JOIN buddyfinder_users2 " +
                    "ON buddyfinder_buddies.BuddyId = buddyfinder_users2.USERID " +
                    "WHERE buddyfinder_buddies.UserId = ?1";

            Query query = em.createNativeQuery(sql, User.class);
            query.setParameter(1, userid);

            List<User> buddies = query.getResultList();
            System.out.println(buddies);

            return buddies;
        } catch (Exception ex)
        {
            return null;
        }
    }
}
