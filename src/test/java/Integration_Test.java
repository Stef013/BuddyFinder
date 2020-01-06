import data.UserRepository;
import models.User;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;

public class Integration_Test
{
    //@Rule
    //public EntityManagerProvider provider = EntityManagerProvider.withUnit("testPU");

    /*@Test
    public void test_Creating_Users() {
        this.provider.begin();
        this.provider.em().persist(new User("Piet", "Password"));
        this.provider.em().persist(new User("Jan", "Password"));
        this.provider.em().persist(new User("Henk", "Password"));

        List<User> resultList = this.provider.em()
                .createNativeQuery("SELECT * FROM buddyfinder_users2", User.class)
                .getResultList();

        assertEquals(3, resultList.size());

        for (User resultUser : resultList) {
            assertNotEquals(0, resultUser.getUserId());
        }

        this.provider.commit();
    }

    @Test
    public void test_Updating_User() {
        this.provider.begin();
        User user = new User("Piet", "Password");
        this.provider.em().persist(user);

        user.setHobby1("Voetballen");
        this.provider.em().merge(user);

        String expectedHobby = "Voetballen";
        String actualHobby = this.provider.em()
                .createNativeQuery("SELECT HOBBY1 FROM buddyfinder_users2 WHERE Username='Piet'")
                .getSingleResult().toString();

        assertEquals( expectedHobby, actualHobby);

        this.provider.commit();
    }*/

    private UserRepository userRepo;

    @Before
    public void setup()
    {
        userRepo = new UserRepository("testPU");
    }



    @Test
    public void test_Create_User() {
        User user = new User("Piet", "Password");

        boolean actualResult = userRepo.insertUser(user);

        assertTrue(actualResult);
    }

    @Test
    public void test_Create_User_AlreadyExists() {
        User user = new User("Piet", "Password");
        userRepo.insertUser(user);

        User newUser = new User("Piet", "Password123");
        boolean actualResult = userRepo.insertUser(newUser);

        System.out.println(actualResult);
        assertFalse(actualResult);
    }

    @Test
    public void test_Login_User() {
        User user = new User("Piet", "Password");

        boolean actualResult = userRepo.insertUser(user);

        assertTrue(actualResult);
    }

    @Test
    public void test_Read_User_ByString() {
        User user = new User("Piet", "Password");

        boolean actualResult = userRepo.insertUser(user);

        assertTrue(actualResult);
    }

    @Test
    public void test_Update_User() {
        User user = new User("Piet", "Password");

        boolean actualResult = userRepo.insertUser(user);

        assertTrue(actualResult);
    }
}
