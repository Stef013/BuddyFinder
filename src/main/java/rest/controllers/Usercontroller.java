package rest.controllers;

import com.google.gson.Gson;
import data.MatchRepository;
import data.UserRepository;
import models.LoginModel;
import models.User;

import java.util.List;

import static rest.JsonUtil.json;
import static spark.Spark.*;

public class Usercontroller
{
    private Gson gson = new Gson();
    private UserRepository userRepository = new UserRepository();
    private MatchRepository matchRepository = new MatchRepository();

    public Usercontroller(final String a)
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


        post("/User/SignUp/", (request, response) ->  {

            System.out.println("In /User/SignUp");
            String body = request.body();
            System.out.println(body);

            LoginModel lm = gson.fromJson(body, LoginModel.class);
            User user = new User(lm.getUsername(), lm.getPassword()) ;

            boolean result = userRepository.insertUser(user);

            String json = gson.toJson(result);
            System.out.println(json);
            return json;

        });

        post("/User/Login/", (request, response) -> {

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

        post("/User/Update/", (request, response) -> {

            System.out.println("In /User/Update");
            String body = request.body();
            System.out.println(body);

            User user = gson.fromJson(body, User.class);

            boolean resultdata = userRepository.update(user);

            //String resultdata = user.getFirstname();
            String json = gson.toJson(resultdata);
            System.out.println(json);

            return json;
        });

        post("/Match/", (request, response) -> {

            System.out.println("In /Match");
            String body = request.body();
            System.out.println(body);

            User user = gson.fromJson(body, User.class);

            List<User> matches = matchRepository.findMatches(user);

            //String resultdata = user.getFirstname();
            String json = gson.toJson(matches);
            System.out.println(json);

            return json;
        });

        get("/User/GetTest", (request, response) -> "lol", json());

        exception(IllegalArgumentException.class, (e, req, res) -> {

            res.status(400);
        });
    }
}
