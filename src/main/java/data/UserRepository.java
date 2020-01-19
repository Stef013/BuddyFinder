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

            String jpql = "SELECT u FROM User u WHERE u.username LIKE ?1 AND u.password Like ?2";
            TypedQuery<User> query = em.createQuery(jpql, User.class);
            query.setParameter(1, user.getUsername());
            query.setParameter(2, hashing.hash(user.getPassword()));
            User userdata = query.getSingleResult();

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
            String jpql = "SELECT u FROM User u WHERE u.username LIKE ?1";
            TypedQuery<User> query = em.createQuery(jpql, User.class);
            query.setParameter(1, username);
            User profile = query.getSingleResult();

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
            String jpql = "SELECT u.buddies FROM User u Where u.userid LIKE ?1";
            TypedQuery<User> query = em.createQuery(jpql, User.class);
            query.setParameter(1, userid);

            List<User> buddies = query.getResultList();

            if (buddies.get(0) == null)
            {
                buddies.clear();
            }
            return buddies;
        } catch (Exception ex)
        {
            return null;
        }
    }
}
