/*------required modules-------*/
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { json } = require("body-parser");
const fabric = require("fabric").fabric;
const { response } = require("express");
var canvas = new fabric.StaticCanvas(null);
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); //for reading files locally form public directory
const server = app.listen(PORT, () => {
  //listning on the port
  console.log(`Server listening on ${PORT}`);
});

// /* ----------------- database ----------------------*/

/* ----------------- database ----------------------*/
mongoose.connect(process.env.DB_CONN);

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  data: Object,
});
const Note = mongoose.model("Note", noteSchema);

/*----------------------- databaseEnd -----------------------*/


/*--------------- SocketIo--------------*/

const socketIO = require("socket.io")(server); //socket io server code

socketIO.sockets.on("connection", function (socket) {
  socket.emit("give-us-id");
  socket.on("take-id", (ID) => {
    if (ID === null) {
    } else {
      Note.findOne({ _id: ID }, (err, data) => {
        if (err) {
        } else {
          socket.emit("data-from-server-first", ID, JSON.stringify(data.data)); //on connection emiting signal
        }
      });
    }
  });

  socket.on("data-from-client", (ID, message) => {
    //client returns data on changes
    Note.findOneAndUpdate(
      { _id: ID },
      { data: JSON.parse(message) },
      null,
      (err, docs) => {
        if (err) {
        } else {
          socket.broadcast.emit("data-from-server", ID, message);
        }
      }
    );
  });
});

/*-----------------Soket Io -----------------------*/


/*-----------------routes-----------------*/
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/notes", (req, res) => {
  Note.find((err, notes) => {
    if (err) {
    } else {
      notes.map((note) => {
        canvas.loadFromJSON(note.data, () => {
          canvas.renderAll();
          var url = canvas.toDataURL({
            width: 343,
            height: 490,
          });
          note.data = url;
        });
      });
      res.send(notes);
    }
  });
});

app.post("/addNote", (req, res) => {

  var newNote = new Note({
    title: req.body.title,
    content: req.body.content,
    data: { objects: [], background: "#fff" },
  });

  newNote.save((err, result) => {
    if (err) {
      res.send(err);
    } else {
      canvas.loadFromJSON(result.data, () => {
        canvas.renderAll();
        var url = canvas.toDataURL({
          width: 343,
          height: 490,
        });
        result.data = url;
      });
      res.send(result);
    }
  });
});

/*------deleting the requested note-----*/
app.delete("/deleteNote/:id", (req, res) => {
  Note.deleteOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      return res.status(500);
    } else {
      return res.end();
    }
  });
});

