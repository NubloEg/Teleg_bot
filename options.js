module.exports={
    /* кнопки */
    gameOptions:{
        reply_markup:JSON.stringify({
            inline_keyboard:[
                [{text:'Кнопка 1',callback_data:'кнопка 1'},{text:'Кнопка 2',callback_data:'кнопка 2'},{text:'Кнопка 3',callback_data:'кнопка 3'}]
            ]
        })
    }
}