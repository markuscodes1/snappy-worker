import express from "express";
import morgan from "morgan";
import { BotMessage } from "./types";
import { CONFIRMATION, PORT } from "./config";
import botEvent from "./botEvent";
import parseAction from "./parseAction";
import botActions from "./botActions";
import apiRouter from "./apiRouter";
import { errorHandler } from "./middleware";
import "./botHandlers";

const server = express();

server.use(morgan("common"));
server.use(express.json());

server.post("/vk-bot", (req, res) => {
  const { type, object } = req.body as BotMessage;

  if (type === "confirmation") {
    return res.send(CONFIRMATION);
  }
  if (type === "message_new") {
    const action = botActions.find((action) =>
      parseAction(object.message.text).toLowerCase().includes(action)
    );

    if (action) botEvent.emit(action, object.message);
  }

  console.log(req.body);

  return res.send("ok");
});

server.use("/api", apiRouter);
server.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
