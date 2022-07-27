
const express = require('express');
const app = express();


//request la homepage
app.get('/', (req, res) => {
    console.log('GET pe homepage');
    res.send('Hello, human! Welcome to the Happy Calculator!');
})


//parametri din url
let op;
let nr1;
let nr2;

app.get('/:op/:nr1/:nr2', (req, res) => {

    //operatia
    let operatie = req.params.op;

    //cele doua numere transformate in int
    let nr = [parseInt(req.params.nr1), parseInt(req.params.nr2)];

    let rez;

    //in functie de ce operatie se citeste
    switch (operatie){
        case 'add':
            rez = nr[0] + nr[1];
            console.log('Request +');
            break;

        case 'substract':
            rez = nr[0] - nr[1];
            console.log('Request -');
            break;

        case 'multiply':
            rez = nr[0] * nr[1];
            console.log('Request *');
            break;

        case 'divide':
            rez = nr[0] / nr[1];
            console.log('Request :');
            break;

        default:
            rez = '';
            console.log('Client introduced FORBIDDEN words');
            //BadRequestException
            res.status(400);
            break;
    }
    //se trimite rezultatul pe pagina
    res.send("I think the number you're looking for is ... exactly " + rez.toString() + '!');

})

//asculta pe portul corespuzator
const server = app.listen(1234, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Nice job, listening at http://%s%s', host, port);
})