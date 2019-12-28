package data.interfaces;

import models.User;
import java.util.List;

public interface IMatchRepository
{
    List<User> findMatches(User user);
    List<User> checkForBuddies(User user, List<User> matches);
    boolean isBuddy(int userid, int buddyid);
    List<User> checkForMatches(List<User> allUsers, User user);
}
