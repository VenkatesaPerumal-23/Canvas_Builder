import React, { forwardRef, useEffect } from "react";
import "./CanvasForm.css"; 

const PreviewCanvas = forwardRef(({ size, elements }, ref) => {
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, size.width, size.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size.width, size.height);

    elements.forEach((el) => {
      ctx.fillStyle = el.color || "#000";

      if (el.type === "rectangle") {
        ctx.fillRect(el.x, el.y, el.width, el.height);
      } else if (el.type === "circle") {
        ctx.beginPath();
        ctx.arc(el.x, el.y, el.radius, 0, 2 * Math.PI);
        ctx.fill();
      } else if (el.type === "text") {
        ctx.font = `${el.fontSize || 20}px Arial`;
        ctx.fillText(el.text, el.x, el.y);
      } else if (el.type === "image" && el.image) {
        const img = new Image();
        img.onload = () => ctx.drawImage(img, el.x, el.y, el.width, el.height);
        img.src = URL.createObjectURL(el.image);
      }
    });
  }, [size, elements, ref]);

  return (
    <div className="preview-container">
      <h2 className="preview-title">Canvas Preview</h2>
      <canvas ref={ref} width={size.width} height={size.height} style={{ border: "3px solid black" }} />
    </div>
  );
});

export default PreviewCanvas;
