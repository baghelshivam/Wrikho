import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const PopupSize = () => {
    return (  
        <div style={{color:"white"}}>
            <h4>Choose Size</h4>
            <Popup trigger={<button>Click to open popup</button>}
            position="right center">
                <div>Size</div>
                <button>A4</button>
            </Popup>
        </div>
    );
}
 
export default PopupSize;