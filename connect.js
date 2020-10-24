const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const path = require('path')
const { InsertIntoDatabase, getStudent, getAverageScores } = require('./database')
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())




app.all("/", (req, res) => {
    res.sendFile(__dirname + path.join("/form.html"))
    if (Object.keys(req.body).length === 5) {
        InsertIntoDatabase(req.body.myname, req.body.myemail, req.body.test1, req.body.test2, req.body.test3)
    }


})

// API TO GET HIGHEST SCORING USER  OF ALL THREE TESTS
app.get("/getHighestScore", (req, res) => {
    getStudent().then((result) => {
        res.send(result)
    }).catch((error) => {
        console.log(error)
    })

})

// API TO GET THE AVERAGE SCORE OF ALL USERS PER TEST
app.get("/getAverageScore", (req, res) => {
    getAverageScores().then((result) => {
        res.send(result)
    }).catch((error) => {
        console.log(error)
    })

})

app.listen(3000, () => {
    console.log("Listening on port 3000!")
})