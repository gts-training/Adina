
const express = require('express');
const app = express();

//request la homepage
app.get('/', (req, res) => {
    console.log('GET pe homepage');
    res.send('Hello, human! Welcome to the Happy Calculator!');
});

app.get('/add/:nr1/:nr2', (req, res) => {

    const n1 = +req.params.nr1;
    const n2 = +req.params.nr2;
    const sum = (n1 + n2).toString();
  
    if (sum == 'NaN') {
        res.statusMessage = "Bad Request";
        res.status(400).end();
    } else {
        res.send(sum);
    }
});

app.get('/substract/:nr1/:nr2', (req, res) => {

    const n1 = +req.params.nr1;
    const n2 = +req.params.nr2;
    const dif = (n1 - n2).toString();

    if (dif == 'NaN') {
        res.statusMessage = "Bad Request";
        res.status(400).end();
    } else {
        res.send(dif);
    }
});

app.get('/multiply/:nr1/:nr2', (req, res) => {

    const n1 = +req.params.nr1;
    const n2 = +req.params.nr2;
    const mul = (n1 * n2).toString();

    if (mul== 'NaN') {
        res.statusMessage = "Bad Request";
        res.status(400).end();
    } else {
        res.send(mul);
    }
});

app.get('/divide/:nr1/:nr2', (req, res) => {

    const n1 = +req.params.nr1;
    const n2 = +req.params.nr2;
    const div = (n1 / n2).toString();

    if (div == 'NaN' || div == 'Infinity') {
        res.statusMessage = "Bad Request";
        res.status(400).end();
    } else {
        res.send(div);
    }
});

const server = app.listen(1234, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Nice, listening at http://%s%s', host, port);
});