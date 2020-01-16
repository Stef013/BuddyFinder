package integrationTests;

import data.MatchRepository;
import data.UserRepository;
import models.Acceptrequest;
import models.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;

import java.util.List;

import static org.junit.Assert.*;

public class MatchRepository_Test
{
    private UserRepository userRepo;
    private MatchRepository matchRepo;
    private User testUser;
    private User testMatch;
    private User testGeenMatch;

    @BeforeEach
    public void setup()
    {
        userRepo = new UserRepository("testPU");
        matchRepo = new MatchRepository("testPU");

        testUser = new User("testUser", "Password");
        testUser.setHobby1("Koken");
        testUser.setHobby2("Schilderen");
        testUser.setHobby3("Lezen");
        userRepo.insertUser(testUser);

        testMatch = new User("testMatch", "Password");
        testMatch.setHobby1("Voetballen");
        testMatch.setHobby2("Lezen");
        testMatch.setHobby3("Koken");
        userRepo.insertUser(testMatch);

        testGeenMatch = new User("testGeenMatch", "Password");
        testGeenMatch.setHobby1("Niksen");
        testGeenMatch.setHobby2(" ");
        testGeenMatch.setHobby3(" ");
        userRepo.insertUser(testGeenMatch);
    }

    @AfterEach
    public void end()
    {
        userRepo.closeConnection();
        matchRepo.closeConnection();
    }

    @Test
    public void test_Find_Matches()
    {
        List<User> matches = matchRepo.findMatches(testUser);

        assertEquals(1, matches.size());

        String expectedMatch = "testMatch";
        String actualMatch = matches.get(0).getUsername();

        assertEquals(expectedMatch, actualMatch);
    }

    @Test
    public void test_Find_No_Matches()
    {
        List<User> matches = matchRepo.findMatches(testGeenMatch);

        assertEquals(0, matches.size());
    }

    @Test
    public void test_Match_Is_Buddy()
    {
        Acceptrequest buddyRequest = new Acceptrequest();
        buddyRequest.setUserid(testUser.getUserId());
        buddyRequest.setBuddyid(testMatch.getUserId());
        userRepo.addBuddy(buddyRequest);

        List<User> matches = matchRepo.findMatches(testUser);
        assertEquals(1, matches.size());

        matches = matchRepo.checkForBuddies(testUser, matches);
        assertEquals(0,matches.size());
    }
}
