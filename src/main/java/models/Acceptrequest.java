package models;

import com.google.gson.annotations.Expose;

public class Acceptrequest
{
    @Expose (serialize = false, deserialize = true)
    private int userid;
    @Expose (serialize = false, deserialize = true)
    private int buddyid;
    @Expose (serialize = false, deserialize = true)
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
