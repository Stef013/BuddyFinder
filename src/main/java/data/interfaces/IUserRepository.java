package data.interfaces;

import models.Acceptrequest;
import models.User;

import java.util.List;

public interface IUserRepository
{
    boolean insertUser(User user);
    User getUserData(User user);
    User getProfile(String username);
    boolean update(User user);
    boolean addBuddy(Acceptrequest acceptrequest);
    List<User> getBuddies(int userid);
}
