package models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.google.gson.annotations.Expose;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table(name="buddyfinder_users2")
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Expose (serialize = true, deserialize = true)
    private int userid;

    @Expose (serialize = true, deserialize = true)
    private String username;

    @Expose (serialize = false, deserialize = true)
    private String password;

    @Expose (serialize = true, deserialize = true)
    private String firstname;
    @Expose (serialize = true, deserialize = true)
    private String lastname;
    @Expose (serialize = true, deserialize = true)
    private String country;
    @Expose (serialize = true, deserialize = true)
    private String city;
    @Expose (serialize = true, deserialize = true)
    private String description;
    @Expose (serialize = true, deserialize = true)
    private String hobby1;
    @Expose (serialize = true, deserialize = true)
    private String hobby2;
    @Expose (serialize = true, deserialize = true)
    private String hobby3;


    @JoinTable(name = "buddyfinder_buddies", joinColumns = {
            @JoinColumn(name = "UserId", referencedColumnName = "userid", nullable = false)}, inverseJoinColumns = {
            @JoinColumn(name = "BuddyId", referencedColumnName = "userid", nullable = false)})

    @ManyToMany
    @Expose(serialize = false, deserialize = false)
    private Collection<User> buddies;

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

    public Collection<User> getBuddies()
    {
        return buddies;
    }

    public void setBuddies(User buddy)
    {
        //this.buddies = new ArrayList<>();
        this.buddies.add(buddy);
    }

    public void clearBuddies()
    {
        this.buddies.clear();
    }
}
