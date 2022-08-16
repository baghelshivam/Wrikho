const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());								//allowing accesing api from client
app.use(express.static(path.join(__dirname, "public")));	//for reading files locally form public directory




/* ----------------- database ----------------------*/

mongoose.connect("mongodb://localhost:27017/wrikhoDB", { useNewUrlParser: true });

const noteSchema = new mongoose.Schema({
	_id: Number,
	title: String,
	link: String,
	content: String
});

const Note = mongoose.model("Note", noteSchema);
var notes;

Note.find(function (err, data) {
	if (err) {
		console.log(err);
	} else {
		notes = data;
	}
});


/*----------------------- databaseEnd -----------------------*/
//routes for requests
// app.get("/api", (req, res) => {	
// 	// console.log(req.body);
// 	// res.sendFile(__dirname+"/public/index.html");
// });


/*-----------------routes-----------------*/
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

app.get("/notes", (req, res) => {
	res.send(notes);
});

app.post("/notes", (req, res) => {
	const data = req.body;
	var query = Note.find();
	query.count(function (err, count) {
		if (err) console.log(err);
		else {

			console.log("count:", count);
			
			var new_note = new Note({
				_id: count + 1,
				title: req.body.title,
				link: req.body.link,
				content: req.body.content
			})
			
			console.log(new_note);
			
			new_note.save(function (err, result) {
				if (err) console.log(err);
				else console.log(result);
			})
		}
	})
})

const server = app.listen(PORT, () => {			//listning on the port
	console.log(`Server listening on ${PORT}`);
});

// socketIO = require("socket.io")(server);	//socket io server code
// socketIO.sockets.on("connection", function (socket) {
// 	socket.emit("greetings-from-server", { greeting: "hello Client" });
// 	socket.on("greetings-from-client", function (message) {
// 		console.log(message);
// 	});
// });
