import { Router } from "express";
import server from "./server";
import vkBot from "./vk/bot";

const router = Router();

router.post("/vk-bot", vkBot.webhook);

server(router);
