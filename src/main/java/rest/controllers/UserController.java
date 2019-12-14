package rest.controllers;

import com.google.gson.Gson;
import data.MatchRepository;
import data.UserRepository;
import models.Acceptrequest;
import models.LoginModel;
import models.User;

import java.util.List;

import static rest.JsonUtil.json;
import static spark.Spark.*;

public class UserController
{
    private Gson gson = new Gson();
    private UserRepository userRepository = new UserRepository();
    private MatchRepository matchRepository = new MatchRepository();

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

            boolean result = userRepository.insertUser(user);

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

            User resultdata = userRepository.getUserData(user);

            String json = gson.toJson(resultdata);
            System.out.println(json);

            return json;
        });

        put("/user", (request, response) -> {

            System.out.println("Put /user");
            String body = request.body();
            System.out.println(body);

            User user = gson.fromJson(body, User.class);

            boolean resultdata = userRepository.update(user);

            String json = gson.toJson(resultdata);
            System.out.println(json);

            return json;
        });

        get("/user", (request, response) -> {
            System.out.println("Get /user");
            String username = request.queryParams("id");
            System.out.println(username);

            User userProfile = userRepository.getProfile(username);

            String json = gson.toJson(userProfile);
            System.out.println(json);

            return json;
        });

        post("/match/", (request, response) -> {

            System.out.println("In /match");
            String body = request.body();
            System.out.println(body);

            User user = gson.fromJson(body, User.class);

            List<User> matches = matchRepository.findMatches(user);

            if(matches != null)
            {
                matches = matchRepository.checkForBuddies(user, matches);
            }

            String json = gson.toJson(matches);
            System.out.println(json);

            return json;
        });

        post("/buddy", (request, response) ->
        {

            System.out.println("POST /buddy");
            String body = request.body();
            System.out.println(body);

            Acceptrequest acceptrequest = gson.fromJson(body, Acceptrequest.class);

            boolean result = userRepository.addBuddy(acceptrequest);

            String json = gson.toJson(result);
            System.out.println(json);

            return json;

        });

        get("/buddy", (request, response) -> {
            System.out.println("Get /buddy");
            String param = request.queryParams("id");
            int userid = Integer.parseInt(param);
            System.out.println(userid);

            List<User> buddies = userRepository.getBuddies(userid);

            String json = gson.toJson(buddies);
            System.out.println(json);

            return json;
        });

        exception(IllegalArgumentException.class, (e, req, res) -> {

            res.status(400);
        });


    }
}
