package data;

import data.interfaces.IRepository;
import data.interfaces.IUserRepository;
import models.Acceptrequest;
import models.User;
import logic.Hashing;
import javax.persistence.*;
import java.util.List;

public class UserRepository implements IRepository, IUserRepository
{
    private Hashing hashing;
    private String persistenceUnit;


    @PersistenceContext
    public static EntityManagerFactory emf;
    public static EntityManager em;


    public UserRepository(String persistenceUnit)
    {
        //this.persistenceUnit = persistenceUnit;
        emf = Persistence.createEntityManagerFactory(persistenceUnit);
        em = emf.createEntityManager();
    }

    public void openConnection()
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

            //openConnection();
            em.getTransaction().begin();

            em.persist(user);
            em.getTransaction().commit();
            //emf.close();

            return true;
        }
        catch(Exception ex)
        {
           // emf.close();
            return false;
        }
    }

    public User getUserData(User user)
    {
        try{
            hashing = new Hashing();

            //openConnection();

            String sql = "Select UserID, Username, Firstname, Lastname, Hobby1, Hobby2, Hobby3" +
                    " FROM buddyfinder_users2 WHERE Username = ?1 AND Password = ?2";
            Query query = em.createNativeQuery(sql, User.class);
            query.setParameter(1, user.getUsername());
            query.setParameter(2, hashing.hash(user.getPassword()));
            User userdata = (User)query.getSingleResult();
            //emf.close();
            //userdata.clearBuddies();

            return userdata;
        }
        catch(Exception ex)
        {
            //emf.close();
            return null;
        }
    }

    public User getProfile(String username)
    {
        try{
            //openConnection();
            String sql = "Select * FROM buddyfinder_users2 WHERE Username = ?1";
            Query query = em.createNativeQuery(sql, User.class);
            query.setParameter(1, username);
            User userdata = (User)query.getSingleResult();
            System.out.println("lolololol");
            //userdata.setPassword(null);
            //userdata.clearBuddies();

            //emf.close();

            return userdata;
        }
        catch(Exception ex)
        {
            //emf.close();
            return null;
        }
    }

    public boolean update(User user)
    {
        try{
            //openConnection();
            em.getTransaction().begin();

            em.merge(user);
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

    public boolean addBuddy(Acceptrequest acceptrequest)
    {
        try{
            //openConnection();
            em.getTransaction().begin();
            User user = em.find(User.class, acceptrequest.getUserid());
            User buddy = em.find(User.class, acceptrequest.getBuddyid());
            user.setBuddies(buddy);
            em.merge(user);
            em.getTransaction().commit();

            em.getTransaction().begin();
            buddy.setBuddies(user);
            em.merge(buddy);
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

    public List<User> getBuddies(int userid)
    {
        try
        {
            //openConnection();

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
            /*for(User b : buddies)
            {
                b.clearBuddies();
            }*/
            //emf.close();
            return buddies;
        } catch (Exception ex)
        {
            //emf.close();
            return null;
        }
    }
}
