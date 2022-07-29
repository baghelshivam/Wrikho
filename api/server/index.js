const express = require("express");
const app = express();
const path = require("path"); 
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//listning on the port
const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

//for reading files locally form public directory
app.use(express.static(path.join(__dirname,"public")));


//socket io server code
const socketIO = require("socket.io")(server);			;

socketIO.sockets.on("connection",function(socket){ 
	socket.emit("greetings-from-server",{greeting:"hello Client"});
	socket.on("greetings-from-client",function(message){
	console.log(message);	
	});
});

//routes for requests
// app.get("/api", (req, res) => {	
// 	// console.log(req.body);
// 	// res.sendFile(__dirname+"/public/index.html");
// });

app.get("/",(req,res) => {
	console.log(__dirname);
	res.sendFile(__dirname+"/public/index.html");
});
