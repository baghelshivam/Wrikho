import React, { useEffect, useRef } from 'react'
import { fabric } from 'fabric'

import PopupSize from "./Sizepopup";

const FabricJSCanvas = () => {				//canvas creating function
	
	const canvasEl = useRef(null);			//created null reference for dom object (canvas)

	useEffect(() => {						//tells to do something after rendring
		const options = {					//options for canvas
			backgroundColor: '#c5d5cb',
			selectionColor: '#9fa8a3A9',	//added alpha in hex code last two digits
			selectionBorderColor: 'black',
			selectionLineWidth: 1,
		};

		const canvas = new fabric.Canvas(canvasEl.current, options);	/*new canvas element created by fabric 
																		with reference priviously defined and give options*/

		//canvas.isDrawingMode = true;		//this property is for if we can draw with mouse pointer
		canvas.setHeight(window.innerHeight * (0.9));//setting same size for all upper lower canvas can use for dynamic one too
		canvas.setWidth(window.innerWidth * (0.9));
		var rect = new fabric.Rect({		//created new object rectangle
			left: 133,
			top: 100,
			fill: 'green',
			width: 20,
			height: 20,
			angle: 45
		});
		canvas.add(rect);					//added new object rectangle
		canvas.renderAll();
	}										//useEffect ends

		, []);

	return (								//returning div element conataining Fabric canvas
	<div> 
		<PopupSize />
		<canvas style={{ textAlign: "center" }} ref={canvasEl} />
	</div>
	);
};
export default FabricJSCanvas;
