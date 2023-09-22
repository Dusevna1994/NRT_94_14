const express = require('express');
const app = express();
const port = 4000;
const oglasiServis = require('radsaoglasimamodul');


app.use(express.urlencoded({extended:false})); //parseri -> sluze da iz tela stranice objekte koji se salju serveru konvertuju u json objekat
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Server radi\nPocetna str.')
});



app.listen(port,()=>{
    console.log('Server AKTIVAN\nPORT: '+port);
});