import React, {useEffect, useRef} from 'react'
import {fabric} from 'fabric'

//canvas creating function 

const FabricJSCanvas = () => {

	//created null reference for dom object (canvas)
  const canvasEl = useRef(null);

	//tells to do something after rendring
  useEffect(() => {

	//options for canvas
    const options = {	backgroundColor: '#c5d5cb',
			selectionColor: '#9fa8a3A9',//added alpha in hex code last two digits
			selectionBorderColor: 'black',
			selectionLineWidth: 1,
		};
	
	//new canvas element created by fabric with reference priviously defined and give options
	const canvas = new fabric.Canvas(canvasEl.current, options);
	
	//this property is for if we can draw with mouse pointer
	//canvas.isDrawingMode = true;	
	//setting same sign for all upper lower canvas can use for dynamic one too	
	canvas.setHeight(window.innerHeight*(0.9));
	canvas.setWidth(window.innerWidth*(0.9));
	var rect = new fabric.Rect({
  		left: 133,
  		top: 100,
  		fill: 'green',
  		width: 20,
  		height: 20,
  		angle: 45
	});
	canvas.add(rect);
	canvas.renderAll();
	}	//useEffect ends

	, []);
  
  return (<canvas style={{textAlign:"center"}} ref={canvasEl}/>);
};
export default FabricJSCanvas;
