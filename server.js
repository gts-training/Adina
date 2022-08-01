
const express = require("express");
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 1234;



const sequelize = new Sequelize('calculator', 'user', 'test', {
    host: 'mysql',
    dialect: 'mysql',
});


sequelize.authenticate().then(
    () => {
        console.log('Connection has been established successfully.');

        app.get('/', (req, res) => {
            console.log('Homepage up');
            res.send('Hello, human! Welcome to the Happy Calculator!');
        });




        const Operation = sequelize.define('Operation', {
            // Model attributes are defined here
            op: {
                type: DataTypes.STRING,
                allowNull: false
            },
            a: {
                type: DataTypes.FLOAT,
                allowNull: false

            },
            b: {
                type: DataTypes.FLOAT,
                allowNull: false

            },
            result: {
                type: DataTypes.FLOAT,
                allowNull: false
            }
        });


        Operation.sync().then(() => {

            //add

            app.get('/add/:nr1(\\d+)/:nr2(\\d+)', (req, res) => {

                const n1 = +req.params.nr1;
                const n2 = +req.params.nr2;
                const sum = (n1 + n2).toString();

                if (sum == 'NaN') {
                    res.statusMessage = "Bad Request";
                    res.status(400).end();
                } else {
                    res.send(sum);
                    Operation.create({ op: "add", a: n1, b: n2, result: sum }).then(
                        (add) => {
                            console.log("Adunare cu rezultatul " + add.result);
                        }
                    );
                }
            });

            //substract

            app.get('/substract/:nr1(\\d+)/:nr2(\\d+)', (req, res) => {

                const n1 = +req.params.nr1;
                const n2 = +req.params.nr2;
                const dif = (n1 - n2).toString();
            
                if (dif == 'NaN') {
                    res.statusMessage = "Bad Request";
                    res.status(400).end();
                } else {
                    res.send(dif);
                    Operation.create({ op: "dif", a: n1, b: n2, result: dif }).then(
                        (dif) => {
                            console.log("Scadere cu rezultatul " + dif.result);
                        }
                    );
                }
            });

            //mul

            app.get('/multiply/:nr1(\\d+)/:nr2(\\d+)', (req, res) => {

                const n1 = +req.params.nr1;
                const n2 = +req.params.nr2;
                const mul = (n1 * n2).toString();
            
                if (mul == 'NaN') {
                    res.statusMessage = "Bad Request";
                    res.status(400).end();
                } else {
                    res.send(mul);
                    Operation.create({ op: "mul", a: n1, b: n2, result: mul}).then(
                        (mul) => {
                            console.log("Inmultire cu rezultatul " + mul.result);
                        }
                    );
                }
            });

            //div

            app.get('/divide/:nr1(\\d+)/:nr2(\\d+)', (req, res) => {

                const n1 = +req.params.nr1;
                const n2 = +req.params.nr2;
                const div = (n1 / n2).toString();
            
                if (div == 'NaN' || div == 'Infinity') {
                    res.statusMessage = "Bad Request";
                    res.status(400).end();
                } else {
                    res.send(div);
                    Operation.create({ op: "div", a: n1, b: n2, result: div}).then(
                        (div) => {
                            console.log("Impartire cu rezultatul " + div.result);
                        }
                    );
                }
            });

            


        });

    },
    (error) => {
        console.error('Unable to connect to the database:', error);

    }
);


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


app.listen(port, () => {
    console.log('server is up')
});
