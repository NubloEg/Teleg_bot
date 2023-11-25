import config from "config";
import { Telegraf } from "telegraf";
import { startBot, stopBot } from "./ControllerTickets.js";
import { message } from "telegraf/filters";

let shd;
//Создаем бота
const bot = new Telegraf(config.get("TELEGRAM_TOKEN"));

//Команды пишуться до запуска бота

// //Обработка сообщений
// bot.on(message('voice'),async ctx=>{
//     await ctx.reply()
// })

// bot.on(message('text'),async ctx=>{
//     await ctx.reply(JSON.stringify(ctx.message))
// })
bot.telegram.setMyCommands([
    {
      command: "start",
      description: "Начать работать с ботом",
    },
    {
        command: "stop",
      description: "Закончить работать с ботом",
    },
  ]);
//Обработка команд
bot.command("start", async (context) => {
  try {
    /*  await context.reply(JSON.stringify(context.message)) */
    await context.reply(
      `Добро пожаловать ${context.from.first_name}! Этот бот бла бла бла и будет присылать дешевые билеты каждые 4ч`
    );
    startBot(bot, context);
  } catch (error) {
    console.log(error.message);
  }
});

bot.command("stop", async (context) => {
  try {
    await context.reply(`Возвращайся к нам ${context.from.first_name}!`);
    stopBot();
  } catch (error) {
    console.log(error.message);
  }
});

//Запуск бота
bot.launch();

//Остановка бота при остановке сервера
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
