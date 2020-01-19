package data;

import data.interfaces.IMatchRepository;
import data.interfaces.IRepository;
import models.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

public class MatchRepository implements IMatchRepository, IRepository
{
    @PersistenceContext
    private static EntityManagerFactory emf;
    private static EntityManager em;

    public MatchRepository(String persistenceUnit)
    {
        emf = Persistence.createEntityManagerFactory(persistenceUnit);
        em = emf.createEntityManager();
    }

    @Override
    public void closeConnection()
    {
        emf.close();
    }

    public List<User> findMatches(User user)
    {
        try
        {
            String jpql = "SELECT u FROM User u WHERE u.userid NOT IN (?1)";

            TypedQuery<User> query = em.createQuery(jpql, User.class);
            query.setParameter(1, user.getUserId());

            List<User> allUsers = query.getResultList();

            List<User> matches = checkForMatches(allUsers, user);

            return matches;
        } catch (Exception ex)
        {
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
            String jpql = "Select u.buddies FROM User u WHERE u.userid LIKE ?1";

            TypedQuery<User> query = em.createQuery(jpql, User.class);
            query.setParameter(1, userid);
            List<User> result = query.getResultList();

            if(result.size() > 0)
            {
                for(User buddy : result)
                {
                    if(buddy.getUserId() == buddyid)
                    {
                        return true;
                    }
                }
                return false;
            }
            else{
                return false;
            }

        } catch (Exception ex)
        {
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


