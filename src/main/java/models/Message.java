package models;

import javax.persistence.*;

@Entity
@Table(name="buddyfinder_messages2")
public class Message
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name="RecieverID")
    private User reciever;

    @ManyToOne
    @JoinColumn(name="SenderID")
    private User sender;

    private String sendername;
    private String message;
    private boolean isrequest;

    public Message(User recieverid, User senderid, String sendername, String message, boolean isrequest)
    {
        this.reciever = recieverid;
        this.sender = senderid;
        this.sendername = sendername;
        this.message = message;
        this.isrequest = isrequest;
    }

    public Message()
    {}


    public int getReciever()
    {
        return recieverid;
    }

    public void setRecieverid(int recieverid)
    {
        this.recieverid = recieverid;
    }

    public int getSenderid()
    {
        return senderid;
    }

    public void setSenderid(int senderid)
    {
        this.senderid = senderid;
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
