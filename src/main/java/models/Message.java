package models;

import com.google.gson.annotations.Expose;

import javax.persistence.*;

@Entity
@Table(name="buddyfinder_messages2")
public class Message
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Expose (serialize = true, deserialize = true)
    private int messageid;

    @ManyToOne
    @JoinColumn(name="RecieverID", referencedColumnName = "userid")
    @Expose (serialize = true, deserialize = true)
    private User reciever;

    @ManyToOne
    @JoinColumn(name="SenderID", referencedColumnName = "userid")
    @Expose (serialize = true, deserialize = true)
    private User sender;

    @Expose (serialize = true, deserialize = true)
    private String sendername;
    @Expose (serialize = true, deserialize = true)
    private String message;
    @Expose (serialize = true, deserialize = true)
    private boolean isrequest;

    public Message(User reciever, User sender, String sendername, String message, boolean isrequest)
    {
        this.reciever = reciever;
        this.sender = sender;
        this.sendername = sendername;
        this.message = message;
        this.isrequest = isrequest;
    }

    public Message()
    {}


    public int getMessageid()
    {
        return messageid;
    }

    public void setMessageid(int messageid)
    {
        this.messageid = messageid;
    }

    public User getReciever()
    {
        return reciever;
    }

    public void setRecieverid(User reciever)
    {
        this.reciever = reciever;
    }

    public User getSender()
    {
        return sender;
    }

    public void setSenderid(User sender)
    {
        this.sender = sender;
    }

    public String getSendername()
    {
        return sendername;
    }

    public void setSendername(String sendername)
    {
        this.sendername = sendername;
    }

    public String getMessage()
    {
        return message;
    }

    public void setMessage(String message)
    {
        this.message = message;
    }

    public boolean isRequest()
    {
        return isrequest;
    }

    public void setIsrequest(boolean isrequest)
    {
        this.isrequest = isrequest;
    }
}
