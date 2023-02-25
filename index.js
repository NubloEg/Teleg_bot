const TelegramApi = require('node-telegram-bot-api')
const {gameOptions}=require('./options')

const token='5997452108:AAGY7u39vht0lWxE9OzD5Zd2pWkxYmRtkGY'

const bot = new TelegramApi(token,{polling:true})

/* Кнопки */


const start=()=>{
    /* Запись используемых команд */
bot.setMyCommands(
    [{command:'/start',description:'Начать общение с ботом'},
    {command:'/info',description:'Узнать информацию о себе'},
    {command:'/game',description:'Мужская игра'},]
)

/* Эвент для прослушивания соощения */
bot.on('message',async msg=>{
    const text=msg.text;
    const name=msg.from.first_name
    const chatId=msg.chat.id;
    switch (text) {

        case '/start':{
            await bot.sendSticker(chatId,'https://tlgrm.ru/_/stickers/e36/0d5/e360d5cc-3eb0-4352-9e4e-677c81a31575/2.webp')
        return bot.sendMessage(chatId,`Привет ${name},присаживайся к огоньку!
Для тебя всегда место найдется)`)}

        case '/info':{
        return bot.sendMessage(chatId,`Тебя зовут ${name} ${msg.from.last_name}`)}


        default:
            {
            return bot.sendMessage(chatId,`${name},я тебя не понимаю`,gameOptions)}
    }})
}

bot.on('callback_query',msg=>{
    console.log(msg)
})

start()