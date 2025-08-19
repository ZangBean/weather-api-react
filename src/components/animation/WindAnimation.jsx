import { useEffect, useRef } from "react";

function WindAnimation() {
  const leavesArray = useRef([]);
  const animationRef = useRef(null);
  const canvasRef = useRef(document.getElementById("windCanvas"));
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

    class Leaf {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 10;
        this.speedX = Math.random() * 3 + 1;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.03 - 0.015;
        this.flip = Math.random() < 0.5 ? 1 : -1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY + Math.sin(Date.now() * 0.001 + this.x) * 0.5;
        this.rotation += this.rotationSpeed;
        if (this.x > canvas.width + this.size) {
          this.x = -this.size;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 15 + 10;
          this.speedX = Math.random() * 3 + 1;
          this.speedY = Math.random() * 0.5 - 0.25;
          this.rotation = Math.random() * Math.PI * 2;
          this.flip = Math.random() < 0.5 ? 1 : -1;
        }
      }

      draw() {
        ctx.current.save();
        ctx.current.translate(this.x, this.y);
        ctx.current.rotate(this.rotation);
        ctx.current.scale(this.flip, 1);
        ctx.current.fillStyle = `rgba(34, 139, 34, ${this.opacity})`;
        ctx.current.beginPath();
        ctx.current.moveTo(0, 0);
        ctx.current.bezierCurveTo(
          this.size * 0.2,
          -this.size * 0.4,
          this.size * 0.8,
          -this.size * 0.4,
          this.size,
          0
        );
        ctx.current.bezierCurveTo(
          this.size * 0.8,
          this.size * 0.4,
          this.size * 0.2,
          this.size * 0.4,
          0,
          0
        );
        ctx.current.fill();
        ctx.current.beginPath();
        ctx.current.moveTo(0, 0);
        ctx.current.lineTo(this.size * 0.9, 0);
        ctx.current.strokeStyle = `rgba(0, 100, 0, ${this.opacity})`;
        ctx.current.lineWidth = 1;
        ctx.current.stroke();
        ctx.current.restore();
      }
    }

    const numberOfLeaves = 20;
    for (let i = 0; i < numberOfLeaves; i++) {
      leavesArray.current.push(new Leaf());
    }

    const animate = () => {
      ctx.current.clearRect(0, 0, canvas.width, canvas.height);
      leavesArray.current.forEach((leaf) => {
        leaf.update();
        leaf.draw();
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      ctx.current.clearRect(0, 0, canvas.width, canvas.height);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return null; // Canvas được mount ở index.html
}

export default WindAnimation;
