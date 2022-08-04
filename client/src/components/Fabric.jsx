import React, { useEffect, useRef } from 'react'
import { fabric } from 'fabric'

import Header from "./HeaderFabric";      //importing components

const FabricJSCanvas = () => {


	const canvasEl = useRef(null);			//created null reference for dom object (canvas)

	useEffect(() => {						//tells to do something after rendring
		const options = {					//options for canvas
			backgroundColor: '#fff',
			selectionColor: '#9fa8a3A9',	//added alpha in hex code last two digits
			selectionBorderColor: 'black',
			selectionLineWidth: 1,
		};
		const canvas = new fabric.Canvas(canvasEl.current, options);	/*new canvas element created by fabric 
																		with reference priviously defined and give options*/

		/*-------------Functions intialization--------------*/
		var canvasScale = 1; 					//for zooming
		var SCALE_FACTOR = 1.2;
		const zoomIn = (canvas) => {
			console.log("zoomin");
			canvasScale = canvasScale * SCALE_FACTOR;
			canvas.setHeight(canvas.getHeight() * SCALE_FACTOR);
			canvas.setWidth(canvas.getWidth() * SCALE_FACTOR);
			canvas.setZoom(canvas.getZoom() * SCALE_FACTOR);
		}

		const zoomOut = (canvas) => {
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
			document.getElementById("drawing").onclick = function (event){
				console.log(canvas.isDrawingMode);				//this property is for if we can draw with mouse pointer
				canvas.isDrawingMode = !canvas.isDrawingMode;
			}
		}
		/*----------Functions intialization ends----------*/


		updateCanvasContext(canvas);
		return () => {
			updateCanvasContext(null);
			canvas.dispose()
		}
	}									//Useeffct ends
		, []);

	return (
		<div>
			<Header />
				<canvas width="300" height="300" ref={canvasEl} />
		</div>
	);		//returning div element conataining Fabric canvas
};

export default FabricJSCanvas;