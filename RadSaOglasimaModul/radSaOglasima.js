const fs = require('fs');
const xml2js = require('xml2js');
const util = require('util');
const putanjaDoOglasa = "oglasi.json";
//const parser = new xml2js.Parser();

let getListaOglasaJSON = () =>{
    let PATH = "../OglasiServis/oglasi.json";
    let oglasi = fs.readFileSync(PATH,(err,data)=>{  //podaci smesteni u prom. oglasi stizu u hexdec formatu
        if(err)
            throw err;
    });
    return JSON.parse(oglasi);  // vracanje na fabr podesavanja i prosledjivanje na response
}

exports.sviOglasi = () =>{
    return getListaOglasaJSON();
}

let snimiOglase = (data) =>{
    console.log(JSON.stringify(data));
    fs.writeFileSync(putanjaDoOglasa,JSON.stringify(data));
}

exports.obrisiOglas = (id) => {
    //console.log(this.sviOglasi().filter(oglas=>oglas.id!=id)); provera sta izbacuje
    snimiOglase(this.sviOglasi().filter(oglas=>oglas.id!=id)); //presnimavanje bez oglasa ciji se id podudara
}

exports.dodajOglas = (noviOglas) => {
    let id = 1;
    let oglasi = this.sviOglasi();
    if(oglasi.length>0){
        id = parseInt(oglasi[oglasi.length-1].id)+1;
    }
    noviOglas.id = id;
    oglasi.push(noviOglas);
    snimiOglase(oglasi);
}

exports.izmeniOglas = (data) =>{
    let oglasi = this.sviOglasi();
    for(let i in oglasi){
        if(oglasi[i].id==data.id){
            oglasi[i] = data;
        }
    }

    snimiOglase(oglasi);
}

// fs.readFileSync('../OglasiServis/oglasi.xml',(err,data)=>{       xml->json parser
//     parser.parseString(data,(err,result)=>{
//         console.log(JSON.stringify(result));
//     });
// });

