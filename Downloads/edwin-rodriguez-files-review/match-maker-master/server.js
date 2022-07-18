const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')
const app = express();
const fileSys = require('fs');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 8008

'use strict';



app.get('/friends', function(req,res) {//DECLARING HOW TO SEND FRIENDS JSON
    res.sendFile(path.join(__dirname + '/app/data', 'friends.json'))
});

app.post('/friends', function(req,res) {

    var newFriend = req.body; //STORING INCOMING JSON    
    var friendsJSON = require("./app/data/friends.json");

    var match;
    var matchScore = 100;

    for (var idx=0; idx<friendsJSON.length; idx++) {//OUTER LOOPING THROUGH FRIENDS
        var totalDiff = 0;
        for (var jdx=0; jdx<10; jdx++) {//INNER LOOPING THROUGH SCORES
            totalDiff += Math.abs(newFriend.scores[jdx]-friendsJSON[idx].scores[jdx])
        }
        if (totalDiff < matchScore) {//NEW MATCH FOUND
            matchScore = totalDiff
            match = friendsJSON[idx];
        }
    }

    //PUSHING NEW FRIEND INTO JSON
    friendsJSON.push(newFriend);
    fileSys.writeFile(path.join(__dirname + '/app/data', 'friends.json'), JSON.stringify(friendsJSON, null, 2), function(err){
        if (err) throw err;
    })

    res.json(match);//SENDING RESPONSE
});


app.get('/survey', function (req, res) {
    res.sendFile(path.join(__dirname, "./app/public/survey.html"));
});

app.get('/images/:image', function (req, res) {
    res.sendFile(path.join(__dirname, `./app/public/matchPhotos/${req.params.image}`));
});

app.get('/css/:css', function (req, res) {
    res.sendFile(path.join(__dirname, `./app/public/css/${req.params.css}`));
});

app.get('/javascript/:javascript', function (req, res) {
    res.sendFile(path.join(__dirname, `./app/public/javascript/${req.params.javascript}`));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "./app/public/index.html"));
});




app.listen(PORT, ()=> {
    console.log("App listening on http://localhost:" + PORT);
});
  

