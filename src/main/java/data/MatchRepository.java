package data;

import models.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

public class MatchRepository
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

    public List<User> findMatches(User user)
    {
        try
        {
            openConnection();
            //em.getTransaction().begin();

            String sql = "Select * FROM buddyfinder_users WHERE NOT UserID = ?1";

            Query query = em.createNativeQuery(sql, User.class);
            query.setParameter(1, user.getUserId());

            List<User> allUsers = query.getResultList();
            System.out.println(allUsers);

            List<User> matches = new ArrayList<>();
            for(User u : allUsers)
            {
                if(u.getHobby1() != null)
                {
                    if (u.getHobby1().contains(user.getHobby1()) || u.getHobby1().contains(user.getHobby2()) ||
                            u.getHobby1().contains(user.getHobby3()) || u.getHobby2().contains(user.getHobby1()) ||
                            u.getHobby2().contains(user.getHobby2()) || u.getHobby2().contains(user.getHobby3()) ||
                            u.getHobby3().contains(user.getHobby1()) || u.getHobby3().contains(user.getHobby2()) ||
                            u.getHobby3().contains(user.getHobby3()))
                    {
                        matches.add(u);
                    }
                }
            }

            //em.getTransaction().commit();

            emf.close();
            return matches;
        } catch (Exception ex)
        {
            emf.close();
            return null;
        }
    }
}


