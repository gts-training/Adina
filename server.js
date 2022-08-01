
const express = require('express');
const app = express();

const memFactory = (operation, a, b, result) => {
    return {
        operation,
        a,
        b,
        result
    };
};

let vector = [];

//request la homepage
app.get('/', (req, res) => {
    console.log('GET pe homepage');
    res.send('Hello, human! Welcome to the Happy Calculator!');
});

app.get('/add/:nr1(\\d+)/:nr2(\\d+)', (req, res) => {

    const n1 = +req.params.nr1;
    const n2 = +req.params.nr2;
    const sum = (n1 + n2).toString();

    if (sum == 'NaN') {
        res.statusMessage = "Bad Request";
        res.status(400).end();
    } else {
        res.send(sum);
        vector.push(memFactory('add', n1, n2, sum));
        console.log(vector);
    }
});

app.get('/substract/:nr1(\\d+)/:nr2(\\d+)', (req, res) => {

    const n1 = +req.params.nr1;
    const n2 = +req.params.nr2;
    const dif = (n1 - n2).toString();

    if (dif == 'NaN') {
        res.statusMessage = "Bad Request";
        res.status(400).end();
    } else {
        res.send(dif);
        vector.push(memFactory('substract', n1, n2, dif));
        console.log(vector);

    }
});

app.get('/multiply/:nr1(\\d+)/:nr2(\\d+)', (req, res) => {

    const n1 = +req.params.nr1;
    const n2 = +req.params.nr2;
    const mul = (n1 * n2).toString();

    if (mul == 'NaN') {
        res.statusMessage = "Bad Request";
        res.status(400).end();
    } else {
        res.send(mul);
        vector.push(memFactory('mul', n1, n2, mul));
        console.log(vector);

    }
});

app.get('/divide/:nr1(\\d+)/:nr2(\\d+)', (req, res) => {

    const n1 = +req.params.nr1;
    const n2 = +req.params.nr2;
    const div = (n1 / n2).toString();

    if (div == 'NaN' || div == 'Infinity') {
        res.statusMessage = "Bad Request";
        res.status(400).end();
    } else {
        res.send(div);
        vector.push(memFactory('div', n1, n2, div));
        console.log(vector);

    }
});

app.get('/memory/clear', (req, res) => {

    vector = [];
    res.send('I remember nothing.');
    console.log(vector);
});

app.get('/memory/recall', (req, res) => {
    if (vector.length === 0) res.send("Nothing here.");
    else res.send("The last thing I remember is " + vector[vector.length - 1].result) + ".";
    console.log(vector);
});

app.get('/memory/recall/:pos(\\d+)', (req, res) => {
    const position = +req.params.pos;
    const len = vector.length;
    if (len < req.params.pos) {
        res.send("You expect too much from me.");
    } else { 
        res.send(`I recall the result in position ${position} is ${vector[len - position].result}.`); 
    }
   
});


const server = app.listen(4321, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Nice, listening at http://%s%s', host, port);
});