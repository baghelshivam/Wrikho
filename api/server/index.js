const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');

const notes = require("./notes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());								//allowing accesing api from client
app.use(express.static(path.join(__dirname, "public")));	//for reading files locally form public directory

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
