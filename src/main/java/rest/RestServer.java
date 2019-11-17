package rest;

import spark.Spark;
import rest.controllers.UserController;
import rest.controllers.MessageController;


public class RestServer
{
    public static void main(String args[])
    {
        //Set IP to listen to
        Spark.ipAddress("127.0.0.1");

        UserController usercontroller =  new UserController(new String());
        //MessageController messagecontroller =  new MessageController(new String());
    }
}
