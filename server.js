
const express = require("express");
const bodyparser = require("body-parser");
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 1234;

app.use(bodyparser.urlencoded({extended:true}));
app.get('', (req, res)=>{
    res.sendFile(__dirname + "/index.html");
})



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

            app.post('/', (req, res) => {
                
                const button = req.body.op;
                const n1 = +req.body.nr1;
                const n2 = +req.body.nr2;
                
                if(button == "ADD"){
                    const add = (n1 + n2).toString();
                    if (add == 'NaN') {
                        res.statusMessage = "Bad Request";
                        res.status(400).end();
                    } else {
                        res.send(add);
                        Operation.create({ op: "add", a: n1, b: n2, result: add }).then(
                            (add) => {
                                console.log("Adunare cu rezultatul " + add.result);
                            }
                        );
                    }
                } else if(button == "SUBSTRACT"){
                    const sub = (n1 - n2).toString();
                    if (sub == 'NaN') {
                        res.statusMessage = "Bad Request";
                        res.status(400).end();
                    } else {
                        res.send(sub);
                        Operation.create({ op: "sub", a: n1, b: n2, result: sub }).then(
                            (sub) => {
                                console.log("Scadere cu rezultatul " + sub.result);
                            }
                        );
                    }
                } else if(button == "MULTIPLY"){
                    const mul = (n1 * n2).toString();
                    if (mul == 'NaN') {
                        res.statusMessage = "Bad Request";
                        res.status(400).end();
                    } else {
                        res.send(mul);
                        Operation.create({ op: "mul", a: n1, b: n2, result: mul }).then(
                            (mul) => {
                                console.log("Inmultire cu rezultatul " + mul.result);
                            }
                        );
                    }
                } else if(button == "DIVIDE"){
                    const div = (n1 / n2).toString();
                    if (div == 'NaN') {
                        res.statusMessage = "Bad Request";
                        res.status(400).end();
                    } else {
                        res.send(div);
                        Operation.create({ op: "div", a: n1, b: n2, result: div }).then(
                            (div) => {
                                console.log("Impartire cu rezultatul " + div.result);
                            }
                        );
                    }
                } else if(button == "MEMORY CLEAR"){
                    Operation.destroy({
                        where: {}
                    });
    
                    res.send('I remember nothing.');
                    console.log("Memory clear");
                } else if(button == "MEMORY RECALL"){ //nu merge
                    const last = Operation.findOne({ 
                        order: [
                            ['createdAt', 'DESC']
                        ],
                     },).then((rez) => {
                        if(rez){
                            res.send(`Last result was ${rez.result}`);
                        console.log("Memory recall");
                    }else{
                        res.send("Nothing to see here");
                        console.log("Memory recall failed");
                    };
                        
                    },
                     (error) => {
                        console.error('Unable to recall: ', error);
                     }
                     );      
                }
           

            });


            // app.get('/memory/recall',  (req, res) => {

                

            // });
        });

    },
(error) => {
    console.error('Unable to connect to the database:', error);

}
);






// app.get('/memory/recall/:pos', (req, res) => {
//     const position = +req.params.pos;
//     const len = vector.length;
//     if (len < req.params.pos) {
//         res.send("You expect too much from me.");
//     } else {
//         res.send(`I recall the result in position ${position} is ${vector[len - position].result}.`);
//     }

// });


app.listen(port, () => {
    console.log('server is up');
});
