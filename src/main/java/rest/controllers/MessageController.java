package rest.controllers;

import com.google.gson.Gson;
import data.MessageRepository;
import models.Message;

import java.util.List;

import static rest.JsonUtil.json;
import static spark.Spark.*;

public class MessageController
{
    private Gson gson = new Gson();
    private MessageRepository messageRepository = new MessageRepository();

    public MessageController(final String a)
    {
        //Link
        //https://www.mscharhag.com/java/building-rest-api-with-spark

        //before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));

        post("/message", (request, response) ->
        {

            System.out.println("POST /message");
            String body = request.body();
            System.out.println(body);

            Message message = gson.fromJson(body, Message.class);

            boolean result = messageRepository.insertMessage(message);

            String json = gson.toJson(result);
            System.out.println(json);
            return json;

        });

        get("/message", (request, response) ->
        {
            System.out.println("GET /message");
            String param = request.queryParams("id");

            int userid = Integer.parseInt(param);
            System.out.println(userid);

            List<Message> messages = messageRepository.getMessages(userid);

            String json = gson.toJson(messages);
            System.out.println(json);

            return json;
        });

        exception(IllegalArgumentException.class, (e, req, res) ->
        {
            res.status(400);
        });
    }
}
