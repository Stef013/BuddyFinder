package models;

public class Acceptrequest
{
    private int userid;
    private int buddyid;
    private int messageid;

    public int getUserid()
    {
        return userid;
    }

    public void setUserid(int userid)
    {
        this.userid = userid;
    }

    public int getBuddyid()
    {
        return buddyid;
    }

    public void setBuddyid(int buddyid)
    {
        this.buddyid = buddyid;
    }

    public int getMessageid()
    {
        return messageid;
    }

    public void setMessageid(int messageid)
    {
        this.messageid = messageid;
    }
}
