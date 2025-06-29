import React, { useState } from "react";
import axios from "axios";
import "./CanvasForm.css"; // Assuming you have some styles for the form

const CanvasForm = ({ canvasSize, setCanvasSize, onAdd }) => {
  const [element, setElement] = useState({
    type: "rectangle",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    radius: 50,
    color: "#000000",
    text: "",
    fontSize: 24,
    image: null,
  });

  const handleInitCanvas = async () => {
    await axios.post("http://localhost:3000/init", {
      width: canvasSize.width,
      height: canvasSize.height,
    });
    alert("Canvas initialized!");
  };

  const handleSubmit = () => {
    onAdd(element);
  };

  return (
    <div className="form-container">
      <h2>Initialize Canvas</h2>
      <div className="icon">
      <img width="35" height="35" src="https://img.icons8.com/pulsar-gradient/48/width.png" alt="width"/>
      <input
        type="number"
        placeholder="Width"
        value={canvasSize.width}
        onChange={(e) => setCanvasSize({ ...canvasSize, width: +e.target.value })}
      />
      </div>
      <div className="icon">
      <img width="35" height="35" src="https://img.icons8.com/pulsar-gradient/48/height.png" alt="height"/>
      <input
        type="number"
        placeholder="Height"
        value={canvasSize.height}
        onChange={(e) => setCanvasSize({ ...canvasSize, height: +e.target.value })}
      />
      </div>
      <button className="initButton" onClick={handleInitCanvas}>Initialize Canvas</button>

      <h2>Add Element</h2>
      <div className="icon">
      <img width="35" height="35" src="https://img.icons8.com/nolan/64/menu.png" alt="menu"/>
      <select
        value={element.type}
        onChange={(e) => setElement({ ...element, type: e.target.value })}
      >
        <option value="rectangle">Rectangle</option>
        <option value="circle">Circle</option>
        <option value="text">Text</option>
        <option value="image">Image</option>
      </select>
      </div>
      <div className="icon">
      <img width="35" height="35" src="https://img.icons8.com/nolan/64/x.png" alt="x"/>
      <input type="number" placeholder="X" onChange={(e) => setElement({ ...element, x: +e.target.value })} />
      </div>

      <div className="icon">
      <img width="35" height="35" src="https://img.icons8.com/nolan/64/y.png" alt="y"/>
      <input type="number" placeholder="Y" onChange={(e) => setElement({ ...element, y: +e.target.value })} />
      </div>

    

      {(element.type === "rectangle" || element.type === "image") && (
        <>
          <div className="icon">
          <img width="35" height="35" src="https://img.icons8.com/nolan/64/question-mark.png" alt="question-mark"/>
          <input type="number" placeholder="Width" onChange={(e) => setElement({ ...element, width: +e.target.value })} />
          </div>
          <div className="icon">
          <img width="35" height="35" src="https://img.icons8.com/nolan/64/question-mark.png" alt="question-mark"/>
          <input type="number" placeholder="Height" onChange={(e) => setElement({ ...element, height: +e.target.value })} />
          </div>
        </>
      )}
      
      {element.type === "circle" && (
       <div className="icon">
        <img width="35" height="35" src="https://img.icons8.com/nolan/64/radius.png" alt="radius"/>
        <input type="number" placeholder="Radius" onChange={(e) => setElement({ ...element, radius: +e.target.value })} />
        </div>
      )}
      {element.type === "text" && (
        <>
          <div className="icon">
          <img width="35" height="35" src="https://img.icons8.com/pulsar-gradient/48/text.png" alt="text"/>
          <input type="text" placeholder="Text" onChange={(e) => setElement({ ...element, text: e.target.value })} />
          </div>
          <div className="icon">
          <img width="35" height="35" src="https://img.icons8.com/pulsar-gradient/48/font-style-formatting.png" alt="font-style-formatting"/>
          <input type="number" placeholder="Font Size" onChange={(e) => setElement({ ...element, fontSize: +e.target.value })} />
          </div>

        </>
      )}
      {element.type === "image" && (
        <div className="icon">
          <img width="35" height="35" src="https://img.icons8.com/nolan/64/image-file.png" alt="image-file"/>
          <input type="file" onChange={(e) => setElement({ ...element, image: e.target.files[0] })} />
        </div>
      )}
      
     <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0', fontSize: '40px' }}>
      <label htmlFor="colorPicker" className="colorPickerLabel">Choose Color:</label>
      <input
        id="colorPicker"
        type="color"
        value={element.color}
        onChange={(e) => setElement({ ...element, color: e.target.value })}
        style={{ width: '40px', height: '40px', border: 'none', cursor: 'pointer' }}
      />
    </div>
      <button onClick={handleSubmit}>Add Your Element</button>
    </div>
  );
};

export default CanvasForm;
