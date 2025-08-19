import { useEffect, useRef } from "react";
import { useCanvasAnimation } from "../hooks/useCanvasAnimation";

function BackgroundAnimation({ temperature }) {
  const snowCanvasRef = useRef(null);
  const windCanvasRef = useRef(null);
  const { startSnow, stopSnow, startWind, stopWind } = useCanvasAnimation(
    snowCanvasRef,
    windCanvasRef
  );

  useEffect(() => {
    stopSnow();
    stopWind();
    if (temperature > 30) {
      // No animations for hot weather
    } else if (temperature > 0) {
      startWind();
    } else {
      startSnow();
    }
  }, [temperature, startSnow, stopSnow, startWind, stopWind]);

  return (
    <>
      <canvas
        ref={snowCanvasRef}
        id="snowCanvas"
        className="absolute inset-0 pointer-events-none"
      />
      <canvas
        ref={windCanvasRef}
        id="windCanvas"
        className="absolute inset-0 pointer-events-none"
      />
    </>
  );
}

export default BackgroundAnimation;
