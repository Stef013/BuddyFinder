package models;

import javax.persistence.*;

@Entity
@Table(name="buddyfinder_users")
public class User
{
    @Id
    private int userId;
    private String username;
    private String password;
    private String firstname;
    private String lastname;

    public User(String username, String firstname, String lastname)
    {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    public User()
    {

    }

    public int getUserId()
    {
        return userId;
    }

    public void setUserId(int userId)
    {
        this.userId = userId;
    }

    public String getUsername()
    {
        return username;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }

    public String getFirstname()
    {
        return firstname;
    }

    public void setFirstname(String firstname)
    {
        this.firstname = firstname;
    }

    public String getLastname()
    {
        return lastname;
    }

    public void setLastname(String lastname)
    {
        this.lastname = lastname;
    }
}
