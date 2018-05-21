'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const Hangman = require('./src/logic')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))



let game;

app.get('/', (req, res) => {
    const {query: {error}} = req
    
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Hangman Express Server</title>
        <link rel="stylesheet" type="text/css" href="styles/main.css">
    </head>
    <body>
        <h1>Hangman Express Server</h1>
        ${error ? `<h3 style="color:red">${error}</h3>`: ''}
        <h4>Please, enter a word and start a new game</h4>
        <form action="/game" method="POST">
            <input type="text" name="text" placeholder="Enter a word">
            <button type="submit">Start Game!</button>
        </form>
    </body>
    </html>`)
})


app.post('/game', (req, res) => {
    const { body: { text } } = req
    const {query: {error} } = req

    
    const word = text;

    try {
        game = new Hangman(word);
    } catch ({ message }) {
        res.redirect(`/?error=${message}`)
    }

 
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Hangman</title>
        <link rel="stylesheet" type="text/css" href="styles/main.css">
    </head>
    <body>
        <h1>Hangman</h1>
        ${error ? `<h3 style="color:red">${error}</h3>`: ''}

        <h2>${game.guessed().join(" ")}</h2>
        <form action="/try-letter" method="POST">
            <input type="text" name="text" placeholder="enter a letter">
            <button type="submit">Try!</button>
        </form>
        <h6>Chivato provisional:${word}</h6>

    </body>
    </html>`)
})


app.post('/try-letter', (req, res) => {
    const { body: { text } } = req
    const letter = text;
   
    try {
        game.try(letter)
        
    } catch ({ message }) {
        console.log(message)    
    }
    const status = game.status() 
    const attempts = game.attempts() 
   
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Hangman</title>
        <link rel="stylesheet" type="text/css" href="styles/main.css">
    </head>
    <body>
        <h1>Hangman</h1>
        <h3>Your choice: ${letter}</h3>
        <h4>Your attemps: ${attempts}</h4>
        <h2>${game.guessed().join(" ")}</h2>
        
        ${status === 1 || status === 2  ? `<h3>GAME OVER</h3>
        <form action="/" method="GET">
        <button type="submit">NEW GAME</button>
        </form>`
        : 
        `<form action="/try-letter" method="POST">
        <input type="text" name="text" placeholder="enter a letter">
        <button type="submit">Try!</button>
        </form>`
        }
        

    </body>
    </html>`)
})




const port = 3000

app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    console.log('stopping server')

    process.exit()
})