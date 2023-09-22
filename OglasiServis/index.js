const express = require('express');
const app = express();
const port = 4000;
const oglasiServis = require('radsaoglasimamodul');


app.use(express.urlencoded({extended:false})); //parseri -> sluze da iz tela stranice objekte koji se salju serveru konvertuju u json objekat
app.use(express.json());

app.get('/',(req,res)=>{        //localhost:4000/ 
    res.send('Server radi\nPocetna str.')
});

app.get('/sviOglasi',(req,res)=>{
    res.send(oglasiServis.sviOglasi());
});

app.get('/dodajOglas',(req,res)=>{
    res.send(`<form action="/DodajOglas" method="post">
        <label for="kateg">Kategorija</label>
        <input type="text" id="idKategorija" name="kategorija"><br><br>
        <label for="datumIsteka">Datum isteka</label>
        <input type="date" id="idDatum" name="datum"><br><br>
        <label for="cena">Cena</label>
        <input type="number" id="idCena" name="cena"><br><br>
        <textarea name="tekst" rows="4" cols="50">Opis oglasa..</textarea><br><br>
        <label for="oznaka">Oznaka</label>
        <input type="text" id="idOznaka" name="oznaka"><br><br>
        <label for="email">E-mail</label>
        <input type="email" id="idEmail" name="email"><br><br>
        <input type="submit" value="Posalji">
    </form>`);
});

app.get('/izmeniOglas/:id',(req,res)=>{
    let oglasi = oglasiServis.sviOglasi();
    let provera = false;
    for(oglas of oglasi){
        if(oglas.id==req.params.id){
            provera = true;
            break;
        }
    }

    if(provera)
        res.send(`<form action="/IzmeniOglas" method="post">
            <label for="id">Izmena na oglasu sa 
            id:${req.params.id}</label><br><br>
            <label for="kateg">Kategorija</label>
            <input type="text" id="idKategorija" name="kategorija"><br><br>
            <label for="datumIsteka">Datum isteka</label>
            <input type="date" id="idDatum" name="datum"><br><br>
            <label for="cena">Cena</label>
            <input type="number" id="idCena" name="cena"><br><br>
            <textarea name="tekst" rows="4" cols="50">Opis oglasa..</textarea><br><br>
            <label for="oznaka">Oznaka</label>
            <input type="text" id="idOznaka" name="oznaka"><br><br>
            <label for="email">E-mail</label>
            <input type="email" id="idEmail" name="email"><br><br>
            <input type="hidden" name="id" value='${req.params.id}'>
            <input type="submit" value="Posalji">
            </form>`);
    else
        res.send('NEPOSTOJI OGLAS SA ID: '+req.params.id);
});

app.post('/IzmeniOglas',(req,res)=>{
    oglasiServis.izmeniOglas(req.body);
    res.end('OK');
});

app.post('/DodajOglas',(req,res)=>{
    oglasiServis.dodajOglas(req.body);
    res.end("OK");
});

app.get('/obrisiOglas/:id',(req,res)=>{
    oglasiServis.obrisiOglas(req.params.id);
    res.send(`ID je: ${req.params["id"]}`);
});

app.delete('/obrisiOglas/:id',(req,res)=>{  //metod delete ne radi! moram da pozivam f-je sa get metodom
    console.log(req.params.id);
    oglasiServis.obrisiOglas(req.params.id);
    res.end("OK");
});

app.listen(port,()=>{  //osluskivac port 4000 u ovom slucaju!
    console.log('Server AKTIVAN\nPORT: '+port);
});