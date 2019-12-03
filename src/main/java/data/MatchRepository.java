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

            String sql = "Select * FROM buddyfinder_users2 WHERE NOT USERID = ?1";

            Query query = em.createNativeQuery(sql, User.class);
            query.setParameter(1, user.getUserId());

            List<User> allUsers = query.getResultList();
            System.out.println(allUsers);

            List<User> matches = checkForMatches(allUsers, user);


            emf.close();
            return matches;
        } catch (Exception ex)
        {
            emf.close();
            return null;
        }
    }

    public List<User> checkForMatches(List<User> allUsers, User user)
    {
        List<User> matches = new ArrayList<>();

        for(User u : allUsers)
        {
            if(u.getHobby1() != null)
            {
                while(true)
                {
                    if(!u.getHobby1().isEmpty())
                    {
                        if (u.getHobby1().equals(user.getHobby1()) || u.getHobby1().equals(user.getHobby2()) ||
                                u.getHobby1().equals(user.getHobby3()))
                        {
                            matches.add(u);
                            break;
                        }
                    }

                    if(!u.getHobby2().isEmpty())
                    {
                        if (u.getHobby2().equals(user.getHobby1()) || u.getHobby2().equals(user.getHobby2()) ||
                                u.getHobby2().equals(user.getHobby3()))
                        {
                            matches.add(u);
                            break;
                        }
                    }

                    if(!u.getHobby3().isEmpty())
                    {
                        if (u.getHobby3().equals(user.getHobby1()) || u.getHobby3().equals(user.getHobby2()) ||
                                u.getHobby3().equals(user.getHobby3()))
                        {
                            matches.add(u);
                            break;
                        }
                    }
                    break;
                }
            }
        }
        return matches;
    }

}


