package data;

import data.interfaces.IMatchRepository;
import data.interfaces.IRepository;
import models.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

public class MatchRepository implements IRepository, IMatchRepository
{
    @PersistenceContext
    public static EntityManagerFactory emf;
    public static EntityManager em;

    public void openConnection()
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
            emf.close();
            System.out.println(allUsers);

            List<User> matches = checkForMatches(allUsers, user);

            return matches;
        } catch (Exception ex)
        {
            emf.close();
            return null;
        }
    }

    public List<User> checkForBuddies(User user, List<User> matches)
    {
        List<User> goodmatches = new ArrayList<>();

        if(matches.size()> 0)
        {
            for( User m : matches)
            {
                if(!isBuddy(user.getUserId(), m.getUserId()))
                {
                    goodmatches.add(m);
                }
            }
        }

        return goodmatches;
    }

    public boolean isBuddy(int userid, int buddyid)
    {
        try
        {
            openConnection();

            String sql = "Select * FROM buddyfinder_buddies WHERE UserId = ?1 AND BuddyId = ?2";

            Query query = em.createNativeQuery(sql, User.class);
            query.setParameter(1, userid);
            query.setParameter(2, buddyid);

            List<User> allUsers = query.getResultList();
            emf.close();
            System.out.println(allUsers);


            return true;
        } catch (Exception ex)
        {
            emf.close();
            return false;
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


