package models;

import javax.persistence.*;

@Entity
@Table(name="buddyfinder_users")
public class User
{
    @Id
    private int userid;
    private String username;
    private String password;
    private String firstname;
    private String lastname;
    private String country;
    private String city;
    private String description;
    private String hobby1;
    private String hobby2;
    private String hobby3;


    /*public User(int userid, String username, String firstname, String lastname, String country, String city)
    {
        this.userid = userid;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.country = country;
        this.city = city;
    }*/

    public User(String username, String password)
    {
        this.username = username;
        this.password = password;
    }

    public User()
    {

    }

    public int getUserId()
    {
        return userid;
    }

    public void setUserId(int userId)
    {
        this.userid = userId;
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

    public String getCountry()
    {
        return country;
    }

    public void setCountry(String country)
    {
        this.country = country;
    }

    public String getCity()
    {
        return city;
    }

    public void setCity(String city)
    {
        this.city = city;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public String getHobby1()
    {
        return hobby1;
    }

    public void setHobby1(String hobby1)
    {
        this.hobby1 = hobby1;
    }

    public String getHobby2()
    {
        return hobby2;
    }

    public void setHobby2(String hobby2)
    {
        this.hobby2 = hobby2;
    }

    public String getHobby3()
    {
        return hobby3;
    }

    public void setHobby3(String hobby3)
    {
        this.hobby3 = hobby3;
    }
}
