import React, { useRef, useState } from "react";
import CanvasForm from "./components/CanvasForm";
import PreviewCanvas from "./components/PreviewCanvas";
import axios from "axios";
import html2canvas from "html2canvas";
import SwirlBackground from "./SwirlBackground";
import "./App.css";

function App() {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 700, height: 400 });
  const [elements, setElements] = useState([]);

const handleAddElement = async (element) => {
    setElements((prev) => [...prev, element]);

    const base = "https://canvas-builder-agxg.onrender.com";

    if (element.type === "rectangle" || element.type === "circle") {
      await axios.post(`${base}/add/shape`, element);
    } else if (element.type === "text") {
      await axios.post(`${base}/add/text`, element);
    } else if (element.type === "image" && element.image) {
      const formData = new FormData();
      formData.append("image", element.image);
      formData.append("x", element.x);
      formData.append("y", element.y);
      formData.append("width", element.width);
      formData.append("height", element.height);
      await axios.post(`${base}/add/image`, formData);
    }
  };


  const exportToPDF = async () => {
    const canvasElement = canvasRef.current;
    const canvasImage = await html2canvas(canvasElement);
    const blob = await new Promise((resolve) => canvasImage.toBlob(resolve, "image/png"));

    const formData = new FormData();
    formData.append("canvas", blob, "canvas.png");

    const response = await axios.post("https://canvas-builder-agxg.onrender.com/export-pdf", formData, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "canvas-export.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <> 
      <SwirlBackground />
      <div className="App">
        <h1>🎨 Canvas Builder</h1>
        <CanvasForm canvasSize={canvasSize} setCanvasSize={setCanvasSize} onAdd={handleAddElement} />
        <PreviewCanvas ref={canvasRef} size={canvasSize} elements={elements} />
        <button className="exportButton" onClick={exportToPDF}>Export to PDF</button>
      </div>
    </>
  );
}

export default App;
