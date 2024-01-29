//Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/CommentDB';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Define schema
var Schema = mongoose.Schema;
var CommentSchema = new Schema(
    {
        name: String,
        comment: String
    }
);

// Compile model from schema
var CommentModel = mongoose.model('Comment', CommentSchema);

//Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Set up static file
app.use(express.static('public'));

//Get data from database
app.get('/comment', function (req, res) {
    CommentModel.find({}, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
});

//Post data to database
app.post('/comment', function (req, res) {
    var comment = new CommentModel(req.body);
    comment.save(function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
});

//Update data from database
app.put('/comment/:id', function (req, res) {
    CommentModel.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
});

//Delete data from database
app.delete('/comment/:id', function (req, res) {
    CommentModel.findByIdAndDelete(req.params.id, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
});

//Start server
app.listen(3000, function () {
    console.log("Server is listening on port 3000");
});
