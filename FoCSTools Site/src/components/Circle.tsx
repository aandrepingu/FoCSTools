import { useRef } from "react";
import useMousePosition from "./useMousePosition";

export default function Circle() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [coords, handleCoords] = useMousePosition(true);

    return (
    <>
    <h1>Add DFA Elements</h1>
    <canvas
        ref={canvasRef}
        width="400"
        height="350"
        style={{ border: "2px solid black" }}
        onClick={(e) => {
          handleCoords((e as unknown) as MouseEvent);
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            ctx?.roundRect(coords.x, coords.y, 50, 50, 10);
          }
        }}
        ></canvas>
    <button
        onClick={() => {
            if(canvasRef.current) {
                const ctx = canvasRef.current.getContext("2d");
                ctx?.clearRect(coords.x, coords.y, 50, 50);
            }
        }
    }
    >Erase</button>
    </>
    );
}
