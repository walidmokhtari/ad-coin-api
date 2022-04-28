const express = require('express')
const bodyParser = require('body-parser')
const pool = require('./dbconfig')
const bcrypt = require('bcrypt')

require("dotenv").config();

//Création de la l'app avec express
const app = express()

//Prendre le port 8080 dans le cas l'abstension du PORT dans le fichier .env
const port = process.env.PORT || 8080;

//Sert pour la conversion 
app.use(express.urlencoded({extended: true}));

//Pour la lecture des fichiers JSON
app.use(express.json());

// Lancer mon serveur avec le port choisi
app.listen(port, () => console.log(`Listening on port ${port}`))

// Endpoint 1 (POST) qui nous sert a la création d'un user
app.post('/register', (req, res) => {
    //Se connecter avec ma base de données
    pool.getConnection((err, connection) => {

        const username = req.body.username
        //Crypter le password pour des raisons de sécurité
        const passwordHashed = bcrypt.hashSync(req.body.password, 10)
        //Executer la requête SQL qui permet de récupérer mes users
        connection.query(`INSERT INTO users (username,password) VALUES ('${username}','${passwordHashed}')`, (err, rows) => {
        connection.release() 
            //Dans le cas ou c'est OK
            if (!err) {
                //On retourne notre réponse
                res.send(rows)
            } else {
                console.log(err)
            }
            
            console.log('The data from beer table are: \n', rows)
        })
    })
})

// Endpoint 2 (GET) qui permet de nous récupérer tous les users dans la table users
app.get('/users', (req, res) => {
    //Se connecter avec ma base de données
    pool.getConnection((err, connection) => {
        //Executer la requête SQL qui permet de récupérer mes users
        connection.query('SELECT * from users', (err, rows) => {
            connection.release() 
            //Dans le cas ou c'est OK
            if (!err) {
                //On retourne notre tableau de donnée
                res.send(rows)
            } else {
                console.log(err)
            }

            console.log('The data from beer table are: \n', rows)
        })
    })
})


// Endpoint 3 (GET) qui permet de nous récupérer tous les users dans la table users
app.get('/get-user-by-id', (req, res) => {
    //Se connecter avec ma base de données
    pool.getConnection((err, connection) => {

        const id = req.body.id

        //Executer la requête SQL qui permet de récupérer mes users
        connection.query(`SELECT * from users where id = ${id}`, (err, rows) => {
            connection.release() 
            //Dans le cas ou c'est OK
            if (!err) {
                //On retourne notre tableau de donnée
                res.send(rows)
            } else {
                console.log(err)
            }

            console.log('The data from beer table are: \n', rows)
        })
    })
})
