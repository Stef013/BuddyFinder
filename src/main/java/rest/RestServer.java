package rest;

import spark.Spark;
import rest.controllers.Usercontroller;

public class RestServer
{
    public static void main(String args[]){

        //Set IP to listen to
        Spark.ipAddress("127.0.0.1");

        Usercontroller usercontroller =  new Usercontroller(new String());
    }
}
