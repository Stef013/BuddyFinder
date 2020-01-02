import logic.Hashing;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

public class Hash_Test {
    Hashing hashing;

    @Before
    public void setup()
    {
        hashing = new Hashing();
    }

    @Test
    public void hash_Success()
    {
        String expectedHash = "fed3b61b2681849378080b34e693d2e";
        String actualHash = hashing.hash("testPassword");

        assertEquals(expectedHash, actualHash);
    }

    @Test
    public void hash_Fail()
    {
        String expectedHash = "fed3b61b2681849378080b34e693d2e";
        String actualHash = hashing.hash("Password");

        assertNotEquals(expectedHash, actualHash);
    }
}
