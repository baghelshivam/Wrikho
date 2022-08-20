const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());											//allowing accesing api from client
app.use(express.static(path.join(__dirname, "public")));	//for reading files locally form public directory

const server = app.listen(PORT, () => {						//listning on the port
	console.log(`Server listening on ${PORT}`);
});


/*--------------- SocketIo--------------*/

var NoteId = null;
const socketIO = require("socket.io")(server);	//socket io server code
socketIO.sockets.on("connection", function (socket) {
	console.log("starting connection server");
	socket.emit("give-us-id");
	socket.on("take-id", ID => {
		NoteId = ID;
		if (NoteId === null) {
			console.log("stopping server");
		} else {
			fs.readFile("/home/dell73/Downloads/WrikhoData/" + NoteId + ".json", (err, data) => {
				if (err) {
					console.log("error in reading");
				} else {		//data acquired from NoteId.json file
					socket.emit("data-from-server", NoteId, JSON.stringify(JSON.parse(data))); //on connection emiting signal
				}
			});
		}
	});

	socket.on("data-from-client", (ID, message) => {	//client returns data on changes
		fs.writeFile("/home/dell73/Downloads/WrikhoData/" + ID + ".json", message, err => {
			if (err) {
				console.log("error in writing");
			} else {
				console.log("succesfully wrote");
				socket.broadcast.emit("data-from-server", ID, message);
			}
		});
	});

});

/* ----------------- database ----------------------*/

mongoose.connect("mongodb://localhost:27017/wrikhoDB", { useNewUrlParser: true });

const noteSchema = new mongoose.Schema({				//_id can be used as saving files in name of _id
	id: Number,
	title: String,
	link: String,
	content: String
});

const Note = mongoose.model("Note", noteSchema);


/*----------------------- databaseEnd -----------------------*/


/*-----------------routes-----------------*/
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});


app.post("/addNote", (req, res) => {
	const data = req.body;
	var query = Note.find();
	query.count(function (err, count) {
		if (err) console.log(err);
		else {
			console.log("count:", count);
			var newNote = new Note({
				id: count + 1,
				title: req.body.title,
				link: req.body.link,
				content: req.body.content
			})
			newNote.save((err, result) => {
				if (err) console.log(err);
				else {
					console.log(result);
					// result._id.toHexString() will give _id using this we will create new file
					const intialData = JSON.stringify({ "objects": [], "background": "#fff" });	//intial data for blank page version doesnt matter
					fs.writeFile("/home/dell73/Downloads/WrikhoData/" + result._id.toHexString() + ".json", intialData, err => {
						if (err) {
							console.log("error in writing");
						} else {
							console.log("succesfully wrote new file");
						}
					});
					res.send(JSON.stringify(result._id.toHexString()));
					// return res.redirect("/notes");
				}
			})
		}
	})
});

app.delete("/deleteNote", (req, res) => {
	console.log("Note to be deleted : ", req.body.id);
	Note.deleteOne({ _id: req.body.id }, (err, result) => {
		if (err) {
			console.log(err);
			return res.status(500);
		} else {
			console.log("Succesfully deleted Note with Id: " + req.body.id);
			return res.end();
		}
	});
});

app.get("/notes", (req, res) => {
	Note.find(function (err, notes) {
		if (err) {
			console.log(err);
		} else {
			res.send(notes);
		}
	});
});

/*-----------------Soket Io -----------------------*/
