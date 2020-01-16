package rest.controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import data.MessageRepository;
import models.Message;

import java.lang.reflect.Modifier;
import java.util.List;

import static spark.Spark.*;

public class MessageController
{
    private static String persistenceUnit = "buddyfinderPU";

    private Gson gson = new GsonBuilder().excludeFieldsWithModifiers(Modifier.PROTECTED).create();
    private MessageRepository messageRepository;

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

            messageRepository = new MessageRepository(persistenceUnit);
            boolean result = messageRepository.insertMessage(message);
            messageRepository.closeConnection();

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

            messageRepository = new MessageRepository(persistenceUnit);
            List<Message> messages = messageRepository.getMessages(userid);
            messageRepository.closeConnection();

            String json = gson.toJson(messages);
            System.out.println(json);

            return json;
        });

        delete("/message", (request, response) ->
        {
            System.out.println("DELETE /message");
            String param = request.queryParams("id");

            int messageid = Integer.parseInt(param);
            System.out.println(messageid);

            messageRepository = new MessageRepository(persistenceUnit);
            boolean result = messageRepository.deleteMessage(messageid);
            messageRepository.closeConnection();

            String json = gson.toJson(result);
            System.out.println(json);

            return json;
        });

        exception(IllegalArgumentException.class, (e, req, res) ->
        {
            res.status(400);
        });
    }
}
