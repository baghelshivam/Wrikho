import React, { useEffect, useState, useRef } from 'react'
import { fabric } from 'fabric'

import Header from "./HeaderFabric";      //importing components
import Footer from "./Footer";

const FabricJSCanvas = () => {				//canvas creating function
	// const canvasEl = useRef(null);			//created null reference for dom object (canvas)

	// useEffect(() => {						//tells to do something after rendring
	// 	const options = {					//options for canvas
	// 		backgroundColor: '#fff',
	// 		selectionColor: '#9fa8a3A9',	//added alpha in hex code last two digits
	// 		selectionBorderColor: 'black',
	// 		selectionLineWidth: 1,
	// 	};
	// 	const canvas = new fabric.Canvas(canvasEl.current, options);	/*new canvas element created by fabric 
	// 																	with reference priviously defined and give options*/

	// 	// canvas.isDrawingMode = true;		//this property is for if we can draw with mouse pointer
	// 	// canvas.setHeight(2.97 * canvas.getHeight()/1.5);//setting same size for all upper lower canvas can use for dynamic one too
	// 	// canvas.setWidth(2.10 * canvas.getWidth()/1.5);
	// 	canvas.renderAll();
	// }										//useEffect ends

	// 	, []);

	// return (								//returning div element conataining Fabric canvas
	// 	<div>
	// 		<Header />
	// 				<canvas className="fabricCanvas" ref={canvasEl} />
	// 		<Footer />
	// 	</div>
	// );
	const [canvas, setCanvas] = useState();

	useEffect(() => {
		setCanvas(intitCanvas());
	}, []);

	const intitCanvas = () => (
		new fabric.Canvas("canvas", {
			height: 800,
			width: 800,
			backgroundColor: "white",
			isDrawingMode: "tru",
		})
	);

	return (
		<div className="fabric">
			<Header />
			{/* <button onClick={() => freeHand(canvas)}>FreeDraw</button> */}
			<canvas id="canvas" className="fabricCanvas" />
		</div>
	);
};
export default FabricJSCanvas;
