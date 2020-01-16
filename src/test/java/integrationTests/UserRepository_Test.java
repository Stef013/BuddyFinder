package integrationTests;

import data.UserRepository;
import models.Acceptrequest;
import models.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;

import java.util.List;

import static org.junit.Assert.*;

public class UserRepository_Test
{
    private UserRepository userRepo;
    private User testUser;

    @BeforeEach
    public void setup()
    {
        userRepo = new UserRepository("testPU");
        testUser = new User("testUser1", "Password");
        userRepo.insertUser(testUser);

        testUser.setPassword("Password");
    }

    @AfterEach
    public void end()
    {
        userRepo.closeConnection();
    }

    @Test
    public void test_Create_User() {
        User user = new User("Piet", "Password");

        boolean actualResult = userRepo.insertUser(user);

        assertTrue(actualResult);
    }

    @Test
    public void test_Create_User_AlreadyExists() {

        User newUser = new User("testUser1", "Password123");
        boolean actualResult = userRepo.insertUser(newUser);

        assertFalse(actualResult);
    }

    @Test
    public void test_Login_User() {
        User loggedInUser = userRepo.getUserData(testUser);

        assertNotNull(loggedInUser);
        assertNotEquals(0, loggedInUser.getUserId());
    }

    @Test
    public void test_Get_Profile() {
        User actualProfile = userRepo.getProfile(testUser.getUsername());
        String expectedUsername = "testUser1";

        assertEquals(expectedUsername, actualProfile.getUsername());
    }

    @Test
    public void test_Update_User() {
        String expectedHobby1 = "Voetballen";
        String expectedHobby2 = "Koken";
        String expectedHobby3 = "Lezen";
        testUser.setHobby1(expectedHobby1);
        testUser.setHobby2(expectedHobby2);
        testUser.setHobby3(expectedHobby3);

        boolean actualResult = userRepo.update(testUser);
        assertTrue(actualResult);

        User updatedUser = userRepo.getProfile(testUser.getUsername());

        assertEquals(expectedHobby1, updatedUser.getHobby1());
        assertEquals(expectedHobby2, updatedUser.getHobby2());
        assertEquals(expectedHobby3, updatedUser.getHobby3());
    }

    @Test
    public void test_Add_Buddy() {
        User user = new User("testBuddy", "Password");

        userRepo.insertUser(user);

        Acceptrequest buddyrequest = new Acceptrequest();
        buddyrequest.setUserid(1);
        buddyrequest.setBuddyid(2);

        boolean actualResult = userRepo.addBuddy(buddyrequest);

        assertTrue(actualResult);
    }

    @Test
    public void test_Get_Buddies() {
        User user = new User("testBuddy", "Password");
        userRepo.insertUser(user);

        Acceptrequest buddyrequest = new Acceptrequest();
        buddyrequest.setUserid(testUser.getUserId());
        buddyrequest.setBuddyid(user.getUserId());

        userRepo.addBuddy(buddyrequest);

        List<User> buddies = userRepo.getBuddies(1);

        String expectedBuddy = "testBuddy";
        String actualBuddy = buddies.get(0).getUsername();

        assertEquals(expectedBuddy, actualBuddy);
    }
}
