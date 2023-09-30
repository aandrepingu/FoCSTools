import { useEffect, useRef } from "react";

export default function Rectangle(){
 const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            ctx?.strokeRect(100, 100, 50, 50);
        }
  }, []);

 return (
 <canvas
      ref={canvasRef}
      width="800"
      height="700"
      style={{ border: "2px solid black" }}
    />
  );
};