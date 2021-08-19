const got = require('got');
const jsdom = require("jsdom");

module.exports = function (app) {
    app.get("/mzk/:id", (req, res) => {
        let id = req.params.id;
        //Lista ID przystanków: https://rozklad.mzk.zgora.pl/rozklad.php?a=0107&co=listap
        got("https://traveller.mzk.zgora.pl/newvm/main?command=fs&stop="+id).then(response => {
            let departures = [];
            const { JSDOM } = jsdom;
            const dom = new JSDOM(response.body).window.document;
            dom.querySelectorAll('table#departures-table tbody tr').forEach(result => {
                let departure = {
                    "linia": result.children[0].textContent,
                    "kierunek": result.children[1].textContent,
                    "czas": result.children[2].textContent
                }
                departures.push(departure)
            });
            if(departures[0]){
                res.json(departures)
            }else{
                res.json({error: true})
            }
            
        }).catch(err => {
            res.json({error: true})
        });
    });
};