package rest;

import models.User;
import spark.Spark;
import rest.controllers.Usercontroller;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;

public class RestServer
{

    @PersistenceContext
    public static EntityManagerFactory emf = Persistence.createEntityManagerFactory("userPU");
    public static EntityManager em = emf.createEntityManager();

    public static void main(String args[]){

        em.getTransaction().begin();

        User u1= new User();
        u1.setUsername("Kees013");
        u1.setPassword("Welkom01");
        u1.setFirstname("Kees");
        u1.setLastname("Vlees");

        em.persist(u1);

        em.getTransaction().commit();

        emf.close();
        //em.close();

        //Set IP to listen to
        Spark.ipAddress("127.0.0.1");

        Usercontroller usercontroller =  new Usercontroller(new String());
    }
}
