import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { useParams } from "react-router-dom";
import { fabric } from "fabric";
import Header from "./HeaderFabric"; //importing components
import useWindowDimensions from "./WindowDimension";
import jsPDF from "jspdf";
import Loading from "../Loading/Loading";
const ENDPOINT = "https://api-kasg.onrender.com"; //for also accesing data on another connected device

/*--------Exported function ------------*/
const FabricJSCanvas = () => {
  const canvasId = useParams().pathId; //We can access id by params.pathId
  const canvasEl = useRef(null); //created null reference for dom object (canvas)
  const [isLoading, setIsLoading] = useState(true);

  var canvasScale = 1; //for zooming
  var SCALE_FACTOR = 1.2;
  const { height } = useWindowDimensions();
  const original = 700;

  // const updateCanvasContext = (canvas) => {		//this is the function which user can define to update context of canvas
  // }

  /*-------------Functions intialization--------------*/

  const zoomIn = (canvas, canvasScale, SCALE_FACTOR) => {
    //zoom in function
    // console.log("zoomin");
    canvasScale = canvasScale * SCALE_FACTOR;
    canvas.setHeight(canvas.getHeight() * SCALE_FACTOR);
    canvas.setWidth(canvas.getWidth() * SCALE_FACTOR);
    canvas.setZoom(canvas.getZoom() * SCALE_FACTOR);
  };

  const zoomOut = (canvas, canvasScale, SCALE_FACTOR) => {
    //zoom out function
    // console.log("zoomout");
    canvasScale = canvasScale / SCALE_FACTOR;

    canvas.setHeight(canvas.getHeight() * (1 / SCALE_FACTOR));
    canvas.setWidth(canvas.getWidth() * (1 / SCALE_FACTOR));
    canvas.setZoom(canvas.getZoom() / SCALE_FACTOR);
  };

  /*canvas*/
  const options = {
    //options for canvas
    backgroundColor: "#fff",
    selectionColor: "#9fa8a3A9", //added alpha in hex code last two digits
    selectionBorderColor: "black",
    selectionLineWidth: 1,
  };

  /*----------Functions intialization ends----------*/

  useEffect(() => {
    //tells to do something after rendring

    const canvas = new fabric.Canvas(
      canvasEl.current,
      options
    ); /*new canvas element created by fabric 
																		with reference priviously defined and give options*/
    canvas.freeDrawingBrush.width = 0.7;

    /*--------Soket----------*/

    const socket = socketIOClient(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });

    socket.on("give-us-id", () => {
      //server asking for id of the Note
      socket.emit("take-id", canvasId);
    });

    socket.on("data-from-server-first", (incomingId, data) => {
      //retriving data for first time on connection
      incomingId === canvasId
        ? canvas.loadFromJSON(data)
        : console.log("Ids not match"); //checking incoming data belong to this file or not
    //   console.log("height first: " + height);
      canvas.setZoom(canvas.getZoom() * (height / original)); //applying data as per height
    });

    socket.on("data-from-server", (incomingId, data) => {
      incomingId === canvasId
        ? canvas.loadFromJSON(data)
        : console.log("Ids not match"); //checking incoming data belong to this file or not
      //   console.log("height aother: " + height);
    });

    /*------EventListeners-----*/

    canvas.on("object:modified", () => {
      //canvas modified
      socket.emit("data-from-client", canvasId, JSON.stringify(canvas));
    });

    canvas.on("path:created", (e) => {
      //event listner to check change in data on canvas
      socket.emit("data-from-client", canvasId, JSON.stringify(canvas));
    });

    document.getElementById("clear").onclick = function (event) {
      var deletObj = canvas.getActiveObject();
      if (deletObj.type === "activeSelection") {
        deletObj.canvas = canvas;
        deletObj.forEachObject((obj) => {
          canvas.remove(obj);
        });
      } else {
        var activeObject = canvas.getActiveObject();
        if (activeObject !== null) {
          canvas.remove(activeObject);
        }
      }
      socket.emit("data-from-client", canvasId, JSON.stringify(canvas));
    };

    document.getElementById("zoomIn").onclick = function (event) {
      zoomIn(canvas, canvasScale, SCALE_FACTOR);
    };

    document.getElementById("zoomOut").onclick = function (event) {
      zoomOut(canvas, canvasScale, SCALE_FACTOR);
    };

    document.getElementById("drawing").onclick = function (event) {
      //   console.log(canvas.isDrawingMode); //this property is for if we can draw with mouse pointer
      canvas.isDrawingMode = !canvas.isDrawingMode;
    };

    document.getElementById("save").onclick = function (event) {
      //hard coded
      const copyCanvas = canvas;
      // copyCanvas.setHeight(1400/1.5);			//this may change if the apect ration of pages are different
      // copyCanvas.setWidth(980/1.5);			//when copy get changed real one also get changed
      // copyCanvas.setZoom(2.85/1.5);

      alert("Tip for better quality first zoom canvas then save.   Saving ...");
      let canvasWidth = copyCanvas.width;
      let canvasHeight = copyCanvas.height;

      var pdf = new jsPDF("p", "px", [canvasHeight, canvasWidth]);
      canvasWidth = pdf.internal.pageSize.getWidth();
      canvasHeight = pdf.internal.pageSize.getHeight();
      var imgData = copyCanvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData, "png", 0, 0, canvasWidth, canvasHeight);
      pdf.save("download.pdf");
    };
    /*-------------SocketEnd---------*/

    window.addEventListener("resize", () => {
      //when height changes reload canvas
      window.location.reload();
    }); // updateCanvasContext(canvas);
    setIsLoading(false);
    return () => {
      window.removeEventListener("resize", () => null); // updateCanvasContext(null);
      canvas.dispose();
    };
  }, [canvasId, height, SCALE_FACTOR, canvasScale]); //Useeffct ends

  return (
    <div>
      {false ? (
        <Loading />
      ) : (
        <>
          <Header />
          <canvas
            width={height * 0.7 * 0.7}
            height={height * 0.7}
            ref={canvasEl}
          />
          <span id="container"></span>
        </>
      )}
    </div>
  ); //returning div element conataining Fabric canvas
};

export default FabricJSCanvas;
