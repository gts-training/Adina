
const express = require('express');
const app = express();


//request la homepage
app.get('/', (req, res) => {
    console.log('GET pe homepage');
    res.send('Hello, human! Welcome to the Happy Calculator!');
})



app.get('/add/:nr1/:nr2', (req, res) => {

    let nr1 = parseInt(req.params.nr1);
    let nr2 = parseInt(req.params.nr2);
    let sum = (nr1 + nr2).toString();
    res.send(sum);
    })


app.get('/substract/:nr1/:nr2', (req, res) => {

    let nr1 = parseInt(req.params.nr1);
    let nr2 = parseInt(req.params.nr2);
    let dif = (nr1 - nr2).toString();
    res.send(dif);
    })

app.get('/multiply/:nr1/:nr2', (req, res) => {

    let nr1 = parseInt(req.params.nr1);
    let nr2 = parseInt(req.params.nr2);
    let mul = (nr1 * nr2).toString();
    res.send(mul);
    })

app.get('/divide/:nr1/:nr2', (req, res) => {

    let nr1 = parseInt(req.params.nr1);
    let nr2 = parseInt(req.params.nr2);
    let div = (nr1 / nr2).toString();
    res.send(div);
    })    



//asculta pe portul corespuzator
const server = app.listen(1234, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Nice, listening at http://%s%s', host, port);
})