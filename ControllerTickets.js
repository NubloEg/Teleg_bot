import schedule from "node-schedule";
import axios from "axios";

let shd;
let result = [];
const way = [
  {
    from: "MOW",
    to: "TYO",
  },
  {
    from: "MOW",
    to: "DXB",
  },
];
const mapTiket = (tiket) => {
  const city = {
    MOW: "Москва",
    TYO: "Токио",
    DXB: "Дубай",
  };
  const from = city[tiket.origin];
  const to = city[tiket.destination];
  const month=tiket.depart_date.split("-")[1]
  const day =tiket.depart_date.split("-")[2]
  const hour =Math.floor(tiket.duration/60)
  const min =tiket.duration-hour*60

  return `${from} -> ${to},
Компания: ${tiket.gate}
Вылет: ${tiket.depart_date}
Время в пути:${hour}ч ${min}мин
Пересадок: ${tiket.number_of_changes}, Цена: ${tiket.value} RUB
Ссылка на билет:https://www.aviasales.ru/search/${tiket.origin}${day}${month}${tiket.destination}1?marker=505307.Zzb4bb04cb66374a228916e18-505307&market=ru`;
};

export const getTickets = async () => {
  result = [];
  for (const [idx, el] of way.entries()) {
    const tiket = await request(el.from, el.to);
    result.push(tiket);
  }
  return result;
};

export const request = async (from, to) => {
  const temp = await axios
    .get(
      `https://api.travelpayouts.com/v2/prices/month-matrix?currency=rub&show_to_affiliates=false&origin=${from}&destination=${to}&token=288f8a6f96b46817a9f138c03d4f5454`
    )
    .then((resp) => resp.data.data[0]);
  return mapTiket(temp);
};

export const startBot = (bot, context) => {
  if (shd) {
    shd.cancel();
    shd = "";
  }
  shd = schedule.scheduleJob("*/5 * * * * *", async (ctx) => {
    console.log("in time schudle");
    const tikets = await getTickets();
    tikets.forEach((el) => {
      bot.telegram.sendMessage(context.chat.id, el).catch((err) => {
        console.log(err.message);
      });
    });
  });
};

export const stopBot = () => {
  if (shd) {
    shd.cancel();
  }
};
