const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const { json } = require("body-parser");
const fabric = require("fabric").fabric;
// const { google } = require("googleapis");
const { response } = require("express");
var canvas = new fabric.StaticCanvas(null);
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); //allowing accesing api from client
app.use(express.static(path.join(__dirname, "public"))); //for reading files locally form public directory

const server = app.listen(PORT, () => {
  //listning on the port
  console.log(`Server listening on ${PORT}`);
});

/*--------------- SocketIo--------------*/

var NoteId = null;
const socketIO = require("socket.io")(server); //socket io server code

socketIO.sockets.on("connection", function (socket) {
  console.log("starting connection server");
  socket.emit("give-us-id");
  socket.on("take-id", (ID) => {
    NoteId = ID;
    if (NoteId === null) {
      console.log("stopping server");
    } else {
      Note.findOne({ _id: NoteId }, (err, data) => {
        if (err) {
          console.log(err);
          console.log("error aarhi hai shuruaat me hi");
        } else {
          console.log("shuruaat ka"); // json object
          socket.emit(
            "data-from-server-first",
            NoteId,
            JSON.stringify(data.data)
          ); //on connection emiting signal
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
          console.log("error in writing");
        } else {
          console.log("succesfully wrote");
          socket.broadcast.emit("data-from-server", ID, message);
        }
      }
    );
  });
});

/* ----------------- database ----------------------*/
mongoose.connect(
  process.env.DB_CONN
);

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  data: Object,
});
const Note = mongoose.model("Note", noteSchema);

/*----------------------- databaseEnd -----------------------*/

/*-----------------routes-----------------*/
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/notes", (req, res) => {
  Note.find((err, notes) => {
    if (err) {
      console.log(err);
    } else {
      res.send(notes);
    }
  });
});

app.post("/addNote", (req, res) => {
  const data = req.body;
  var query = Note.find();
  query.count(function (err, count) {
    if (err) console.log(err);
    else {
      console.log("count:", count);

      var newNote = new Note({
        title: req.body.title,
        content: req.body.content,
        data: { objects: [], background: "#fff" },
      });
      newNote.save((err, result) => {
        if (err) console.log(err);
        else {
          console.log(result);
          res.send(JSON.stringify(result._id.toHexString()));
        }
      });
    }
  });
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

app.get("/imageData/:id", (req, res) => {
  console.log("inside /imageData id is :" + req.params.id);

  Note.findOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("new one");
      console.log("result : ", data.title);
      canvas.loadFromJSON(data.data, () => {
        canvas.renderAll();
        var url = canvas.toDataURL({
          width: 343,
          height: 490,
        });
        res.send(JSON.stringify(url));
      });
    }
  });
});
/*-----------------Soket Io -----------------------*/
