import React, { useEffect, useRef } from 'react'
import { fabric } from 'fabric'

import Header from "./Header";      //importing components
import Footer from "./Footer";

const FabricJSCanvas = () => {				//canvas creating function
	const canvasEl = useRef(null);			//created null reference for dom object (canvas)

	useEffect(() => {						//tells to do something after rendring
		const options = {					//options for canvas
			backgroundColor: '#c5d5cb',
			selectionColor: '#9fa8a3A9',	//added alpha in hex code last two digits
			selectionBorderColor: 'black',
			selectionLineWidth: 1,
		};
		var canvasConstant = window.innerHeight/100;
		
		const canvas = new fabric.Canvas(canvasEl.current, options);	/*new canvas element created by fabric 
																		with reference priviously defined and give options*/

		canvas.isDrawingMode = true;		//this property is for if we can draw with mouse pointer
		canvas.setHeight(297*canvasConstant);//setting same size for all upper lower canvas can use for dynamic one too
		canvas.setWidth(210*canvasConstant);
		canvas.renderAll();
	}										//useEffect ends

		, []);

	return (								//returning div element conataining Fabric canvas
		<div>
			<Header />
			<div className="fabricCanvas">
				<div className="drawingPad">
					<canvas ref={canvasEl} />
				</div>
			</div>
			<Footer />
		</div>
	);
};
export default FabricJSCanvas;
