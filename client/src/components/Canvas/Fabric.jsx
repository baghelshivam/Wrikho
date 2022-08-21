import React, { useEffect, useRef } from 'react';
import socketIOClient from "socket.io-client";
import { useParams } from 'react-router-dom';
import { fabric } from 'fabric';

import Header from "./HeaderFabric";      //importing components
import useWindowDimensions from './WindowDimension';
const ENDPOINT = "http://192.168.231.230:3001";			//for also accesing data on another connected device

const FabricJSCanvas = () => {

	const canvasId = useParams().pathId;	//We can access id by params.pathId
	const canvasEl = useRef(null);			//created null reference for dom object (canvas)

	var canvasScale = 1; 					//for zooming
	var SCALE_FACTOR = 1.2;
	const { height, width } = useWindowDimensions();


	/*-------------Functions intialization--------------*/

	const zoomIn = (canvas) => {					//zoom in function
		console.log("zoomin");
		canvasScale = canvasScale * SCALE_FACTOR;
		canvas.setHeight(canvas.getHeight() * SCALE_FACTOR);
		canvas.setWidth(canvas.getWidth() * SCALE_FACTOR);
		canvas.setZoom(canvas.getZoom() * SCALE_FACTOR);
	}

	const zoomOut = (canvas) => {					//zoom out function
		console.log("zoomout");
		canvasScale = canvasScale / SCALE_FACTOR;

		canvas.setHeight(canvas.getHeight() * (1 / SCALE_FACTOR));
		canvas.setWidth(canvas.getWidth() * (1 / SCALE_FACTOR));
		canvas.setZoom(canvas.getZoom() / SCALE_FACTOR);
	}

	const updateCanvasContext = (canvas) => {		//this is the function which user can define to update context of canvas
		document.getElementById("zoomIn").onclick = function (event) {
			zoomIn(canvas);
		};
		document.getElementById("zoomOut").onclick = function (event) {
			zoomOut(canvas);
		};
		document.getElementById("drawing").onclick = function (event) {
			console.log(canvas.isDrawingMode);				//this property is for if we can draw with mouse pointer
			canvas.isDrawingMode = !canvas.isDrawingMode;
		}
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
		}
	}

	/*----------Functions intialization ends----------*/


	useEffect(() => {						//tells to do something after rendring
		const options = {					//options for canvas
			backgroundColor: '#fff',
			selectionColor: '#9fa8a3A9',	//added alpha in hex code last two digits
			selectionBorderColor: 'black',
			selectionLineWidth: 1,
		};
		const canvas = new fabric.Canvas(canvasEl.current, options);	/*new canvas element created by fabric 
																		with reference priviously defined and give options*/
		canvas.freeDrawingBrush.width = 1;


		/*--------Soket----------*/

		const socket = socketIOClient(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });
		socket.on("give-us-id", () => {		//server asking for id of the Note
			socket.emit("take-id", canvasId);
		});
		socket.on("data-from-server", (incomingId, data) => {
			incomingId === canvasId ? canvas.loadFromJSON(data) : console.log("Ids not match");	//checking incoming data belong to this file or not 
		});

		/*------EventListeners-----*/
		canvas.on("object:modified", () => {	//canvas modified
			socket.emit("data-from-client", canvasId, JSON.stringify(canvas));
		});
		canvas.on("path:created", (e) => {		//event listner to check change in data on canvas
			socket.emit("data-from-client", canvasId, JSON.stringify(canvas));
		}
		);


		/*-------------SocketEnd---------*/
		window.addEventListener("resize", ()=>{//when height changes reload canvas
			// canvasEl.current.clientHeight = height;
			window.location.reload();
		});
		updateCanvasContext(canvas);
		return () => {
			updateCanvasContext(null);
			canvas.dispose();
		}
	}, [canvasId]);						//Useeffct ends

	return (
		<div>
			<Header />
			<canvas width={height * 0.7 * 0.7} height={height * 0.7} ref={canvasEl} />
			<span id="container"></span>
		</div>
	);		//returning div element conataining Fabric canvas
};

export default FabricJSCanvas;