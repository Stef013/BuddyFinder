package rest.controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import data.MatchRepository;
import data.MessageRepository;
import data.UserRepository;
import models.Acceptrequest;
import models.LoginModel;
import models.User;

import java.lang.reflect.Modifier;
import java.util.List;

import static spark.Spark.*;

public class UserController
{
    private static String persistenceUnit = "buddyfinderPU";

    private Gson gson = new GsonBuilder().excludeFieldsWithModifiers(Modifier.PROTECTED).create();
    private UserRepository userRepository;
    private MatchRepository matchRepository;

    public UserController(final String a)
    {
        //Link
        //https://www.mscharhag.com/java/building-rest-api-with-spark

        options("/*",
                (request, response) -> {

                    String accessControlRequestHeaders = request
                            .headers("Access-Control-Request-Headers");
                    if (accessControlRequestHeaders != null) {
                        response.header("Access-Control-Allow-Headers",
                                accessControlRequestHeaders);
                    }

                    String accessControlRequestMethod = request
                            .headers("Access-Control-Request-Method");
                    if (accessControlRequestMethod != null) {
                        response.header("Access-Control-Allow-Methods",
                                accessControlRequestMethod);
                    }

                    return "OK";
                });

        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));


        post("/user", (request, response) ->  {

            System.out.println("POST /User");
            String body = request.body();
            System.out.println(body);

            LoginModel lm = gson.fromJson(body, LoginModel.class);
            User user = new User(lm.getUsername(), lm.getPassword()) ;

            userRepository = new UserRepository(persistenceUnit);
            boolean result = userRepository.insertUser(user);
            userRepository.closeConnection();

            String json = gson.toJson(result);
            System.out.println(json);
            return json;
        });

        post("/user/login/", (request, response) -> {

            System.out.println("In /User/Login");
            String body = request.body();
            System.out.println(body);

            LoginModel lm = gson.fromJson(body, LoginModel.class);
            User user = new User(lm.getUsername(), lm.getPassword()) ;

            userRepository = new UserRepository(persistenceUnit);
            User resultdata = userRepository.getUserData(user);
            userRepository.closeConnection();


            String json = gson.toJson(resultdata);
            System.out.println(json);

            return json;
        });

        put("/user", (request, response) -> {

            System.out.println("Put /user");
            String body = request.body();
            System.out.println(body);

            User user = gson.fromJson(body, User.class);

            userRepository = new UserRepository(persistenceUnit);
            boolean resultdata = userRepository.update(user);
            userRepository.closeConnection();

            String json = gson.toJson(resultdata);
            System.out.println(json);

            return json;
        });

        get("/user", (request, response) -> {
            System.out.println("Get /user");
            String username = request.queryParams("id");
            System.out.println(username);

            userRepository = new UserRepository(persistenceUnit);
            User userProfile = userRepository.getProfile(username);
            userRepository.closeConnection();

            String json = gson.toJson(userProfile);
            System.out.println(json);

            return json;
        });

        post("/match/", (request, response) -> {

            System.out.println("In /match");
            String body = request.body();
            System.out.println(body);

            User user = gson.fromJson(body, User.class);

            matchRepository = new MatchRepository(persistenceUnit);
            List<User> matches = matchRepository.findMatches(user);
            matchRepository.closeConnection();

            if(matches != null)
            {
                matchRepository = new MatchRepository(persistenceUnit);
                matches = matchRepository.checkForBuddies(user, matches);
                matchRepository.closeConnection();
            }

            String json = gson.toJson(matches);
            System.out.println(json);

            return json;
        });

        post("/buddy", (request, response) -> {

            System.out.println("POST /buddy");
            String body = request.body();
            System.out.println(body);

            Acceptrequest acceptrequest = gson.fromJson(body, Acceptrequest.class);

            userRepository = new UserRepository(persistenceUnit);
            boolean result = userRepository.addBuddy(acceptrequest);
            userRepository.closeConnection();

            if(result)
            {
                MessageRepository messageRepo = new MessageRepository(persistenceUnit);
                messageRepo.deleteMessage(acceptrequest.getMessageid());
                messageRepo.closeConnection();
            }
            String json = gson.toJson(result);
            System.out.println(json);

            return json;
        });

        get("/buddy", (request, response) -> {
            System.out.println("Get /buddy");
            String param = request.queryParams("id");
            int userid = Integer.parseInt(param);
            System.out.println(userid);

            userRepository = new UserRepository(persistenceUnit);
            List<User> buddies = userRepository.getBuddies(userid);
            userRepository.closeConnection();

            String json = gson.toJson(buddies);
            System.out.println(json);

            return json;
        });

        get("/buddy/check", (request, response) -> {
            System.out.println("Get /buddy");
            String param1 = request.queryParams("userid");
            String param2 = request.queryParams("profileid");
            int userid = Integer.parseInt(param1);
            int profileid = Integer.parseInt(param2);
            System.out.println(userid);

            matchRepository = new MatchRepository(persistenceUnit);
            boolean result = matchRepository.isBuddy(userid, profileid);
            matchRepository.closeConnection();

            String json = gson.toJson(result);
            System.out.println(json);

            return json;
        });

        exception(IllegalArgumentException.class, (e, req, res) -> {
            res.status(400);
        });
    }
}
