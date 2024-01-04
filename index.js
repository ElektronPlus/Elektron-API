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
  res.redirect('https://play.google.com/store/apps/details?id=pl.krystian_wybranowski.elektronPlus');
});

app.listen(port, () => {
  console.log("SERWER API NASŁUCHUJE NA PORCIE: "+port);
})

//At every 5th minute
cron.schedule('*/5 * * * *', () => {
    Cron.getNews()
    Cron.getSubLessons()
});

Cron.getSubLessons()
