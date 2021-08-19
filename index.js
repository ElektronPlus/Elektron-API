const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const cron = require('node-cron');
const Cron = require("./Cron");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({origin: '*'}));
require('./routes')(app);

app.get('/', (req, res) => {
  res.redirect('https://elektronplus.pl/');
});

app.listen(port, () => {
  console.log("SERWER API NASŁUCHUJE NA PORCIE: "+port);
})

//At every 5th minute
cron.schedule('*/5 * * * *', () => {
    Cron.getNews()
});

//At 18:00 on every day-of-week from Sunday through Thursday
cron.schedule('0 18 * * 0-4', () => {
    Cron.drawLuckyNumber()
});