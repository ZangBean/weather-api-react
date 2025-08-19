import { useEffect, useRef } from "react";

function SnowAnimation() {
  const snowflakes = useRef([]);
  const snowInterval = useRef(null);
  const animationRef = useRef(null);
  const canvasRef = useRef(document.getElementById("snowCanvas"));
  const ctx = useRef(canvasRef.current.getContext("2d"));

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    class Snowflake {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.wind = (Math.random() * 10 - 5) * (canvas.width / 100);
        this.speed = Math.random() * 4 + 4;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.size = Math.random() * 10 + 10;
      }

      update(deltaTime) {
        this.y += this.speed * deltaTime * 10;
        this.x += this.wind * deltaTime;
      }

      draw() {
        ctx.current.beginPath();
        ctx.current.globalAlpha = this.opacity;
        ctx.current.font = `${this.size}px serif`;
        ctx.current.fillText("❄", this.x, this.y);
        ctx.current.fillStyle = "white";
        ctx.current.closePath();
      }
    }

    const createSnowflake = () => {
      snowflakes.current.push(new Snowflake());
    };

    const animate = () => {
      ctx.current.clearRect(0, 0, canvas.width, canvas.height);
      const deltaTime = 1 / 60;
      snowflakes.current.forEach((snowflake, index) => {
        snowflake.update(deltaTime);
        snowflake.draw();
        if (snowflake.y > canvas.height) {
          snowflakes.current.splice(index, 1);
        }
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    snowInterval.current = setInterval(createSnowflake, 100);
    animate();

    return () => {
      clearInterval(snowInterval.current);
      cancelAnimationFrame(animationRef.current);
      snowflakes.current = [];
      ctx.current.clearRect(0, 0, canvas.width, canvas.height);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return null; // Canvas được mount ở index.html
}

export default SnowAnimation;
