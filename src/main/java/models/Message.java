package models;

import javax.persistence.*;

@Entity
@Table(name="buddyfinder_messages")
public class Message
{
    @Id
    private int recieverid;
    private int senderid;
    private String message;
    private boolean isrequest;

    public Message(int recieverid, int senderid, String message, boolean isrequest)
    {
        this.recieverid = recieverid;
        this.senderid = senderid;
        this.message = message;
        this.isrequest = isrequest;
    }

    public Message()
    {}


    public int getRecieverid()
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
