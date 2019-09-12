package rest.controllers;

import com.google.gson.Gson;

import static rest.JsonUtil.json;
import static spark.Spark.*;

public class Usercontroller
{
    private Gson gson = new Gson();

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


        post("/Player/Register", (request, response) ->  {

            System.out.println("In /Player/Register");
            String body = request.body();
            //account = gson.fromJson(body, AccountRequestObject.class);
            //AccountObject account = gson.fromJson(body, AccountObject.class);

           boolean result = true;

            String json = gson.toJson(result);
            System.out.println(json);
            return json;

        });

        post("/User/Login", (request, response) -> {

            System.out.println("In /Player/Login");
            String body = request.body();
            //AccountObject account = gson.fromJson(body, AccountObject.class);

            //AccountObject LoggedInUser = AL.login(account.getPlayerName(), account.getPassword());

            //String json = gson.toJson(LoggedInUser);
            //System.out.println(LoggedInUser);
            return body;
        });

        get("/User/GetTest", (request, response) -> "lol", json());

        exception(IllegalArgumentException.class, (e, req, res) -> {

            res.status(400);
        });
    }
}
