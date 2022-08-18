const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const fs = require("fs");
const { json } = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());								//allowing accesing api from client
app.use(express.static(path.join(__dirname, "public")));	//for reading files locally form public directory

const server = app.listen(PORT, () => {			//listning on the port
	console.log(`Server listening on ${PORT}`);
});


/*--------------- SocketIo--------------*/

const socketIO = require("socket.io")(server);	//socket io server code
socketIO.sockets.on("connection", function (socket) {
	// console.log("starting connection");

	fs.readFile("/home/dell73/Downloads/WrikhoData" + "/canvas.json", (err, data) => {
		if (err) {
			console.log("error in reading");
		} else {
			// console.log("succesfully readed");
			socket.emit("greetings-from-server", JSON.stringify(JSON.parse(data))); //on connection emiting signal
		}
	});

	socket.on("greetings-from-client", function (message) { 			//on caching signal
		fs.writeFile("/home/dell73/Downloads/WrikhoData" + "/canvas.json", message, err => {
			if (err) {
				console.log("error in writing");
			} else {
				console.log("succesfully wrote");
				socket.broadcast.emit("greetings-from-server", message);
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

app.get("/notes", (req, res) => {
	Note.find(function (err, notes) {
		if (err) {
			console.log(err);
		} else {
			res.send(notes);
		}
	});
});

app.post("/notes", (req, res) => {
	const data = req.body;
	var query = Note.find();
	query.count(function (err, count) {
		if (err) console.log(err);
		else {
			// {"objects":[],"background":"#fff"}			//intial data for blank page version doesnt matter 
			console.log("count:", count);

			var new_note = new Note({
				id: count + 1,
				title: req.body.title,
				link: req.body.link,
				content: req.body.content
			})

			// console.log(new_note);

			new_note.save(function (err, result) {
				if (err) console.log(err);
				else {
					console.log(result);
					// result._id.toHexString() will give _id using this we will create new file
					const intialData = JSON.stringify({"objects":[],"background":"#fff"});
					fs.writeFile("/home/dell73/Downloads/WrikhoData/" +result._id.toHexString()+".json", intialData, err => {
						if (err) {
							console.log("error in writing");
						} else {
							console.log("succesfully wrote new file");
							// socket.broadcast.emit("greetings-from-server", message);
						}
					});
					return res.redirect("/notes");
				}
			})
		}
	})
})

app.put("/canvas", (req, res) => {
	console.log("canvas changed");
	console.log(req.body);
});


/*-----------------Soket Io -----------------------*/
