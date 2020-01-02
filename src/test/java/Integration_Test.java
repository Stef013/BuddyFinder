import models.User;
import org.junit.Rule;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;

public class Integration_Test
{
    @Rule
    public EntityManagerProvider provider = EntityManagerProvider.withUnit("testPU");

    @Test
    public void test_Creating_Users() {
        this.provider.begin();
        this.provider.em().persist(new User("Piet", "Password"));
        this.provider.em().persist(new User("Jan", "Password"));
        this.provider.em().persist(new User("Henk", "Password"));

        List<User> resultList = this.provider.em()
                .createNativeQuery("SELECT * FROM buddyfinder_users2", User.class)
                .getResultList();

        assertEquals(3, resultList.size());

        for (User resultCustomer : resultList) {
            assertNotEquals(0, resultCustomer.getUserId());
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
    }
}
