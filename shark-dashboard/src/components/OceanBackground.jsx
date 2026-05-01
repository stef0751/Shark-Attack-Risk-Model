import { useEffect, useRef } from "react";

export default function OceanBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const bubbles = Array.from({ length: 40 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 3 + 1,
      speed: Math.random() * 0.4 + 0.1,
      drift: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ocean depth gradient
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, "#000d1a");
      grad.addColorStop(0.4, "#001428");
      grad.addColorStop(1, "#000508");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Caustic light rays
      for (let i = 0; i < 6; i++) {
        const x = (canvas.width / 6) * i + Math.sin(t + i) * 40;
        const rayGrad = ctx.createLinearGradient(x, 0, x + 30, canvas.height * 0.6);
        rayGrad.addColorStop(0, "rgba(0,180,255,0.04)");
        rayGrad.addColorStop(1, "rgba(0,180,255,0)");
        ctx.fillStyle = rayGrad;
        ctx.beginPath();
        ctx.moveTo(x - 10, 0);
        ctx.lineTo(x + 40, 0);
        ctx.lineTo(x + 80, canvas.height * 0.6);
        ctx.lineTo(x + 30, canvas.height * 0.6);
        ctx.closePath();
        ctx.fill();
      }

      // Glowing particles / plankton
      for (let i = 0; i < 80; i++) {
        const px = (Math.sin(t * 0.3 + i * 2.5) * 0.5 + 0.5) * canvas.width;
        const py = (Math.cos(t * 0.2 + i * 1.7) * 0.5 + 0.5) * canvas.height;
        const glow = ctx.createRadialGradient(px, py, 0, px, py, 3);
        glow.addColorStop(0, `rgba(0,230,255,${0.15 + Math.sin(t + i) * 0.08})`);
        glow.addColorStop(1, "rgba(0,230,255,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Bubbles
      bubbles.forEach((b) => {
        b.y -= b.speed;
        b.x += b.drift;
        if (b.y < -10) { b.y = canvas.height + 10; b.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,200,255,${b.opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Shark silhouette
      const sx = canvas.width * 0.12 + Math.sin(t * 0.4) * 30;
      const sy = canvas.height * 0.38 + Math.sin(t * 0.6) * 18;
      const scale = Math.min(canvas.width / 1200, 1) * 1.1;

      ctx.save();
      ctx.translate(sx, sy);
      ctx.scale(scale, scale);
      ctx.globalAlpha = 0.13;

      // Body
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(60, -18, 160, -22, 260, -8);
      ctx.bezierCurveTo(300, -4, 320, 0, 320, 0);
      ctx.bezierCurveTo(300, 4, 260, 12, 200, 14);
      ctx.bezierCurveTo(140, 16, 60, 10, 0, 0);
      ctx.fillStyle = "#00cfff";
      ctx.fill();

      // Dorsal fin
      ctx.beginPath();
      ctx.moveTo(100, -8);
      ctx.lineTo(130, -55);
      ctx.lineTo(160, -8);
      ctx.closePath();
      ctx.fill();

      // Tail
      ctx.beginPath();
      ctx.moveTo(310, 0);
      ctx.lineTo(360, -30);
      ctx.lineTo(345, 0);
      ctx.lineTo(360, 30);
      ctx.closePath();
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.restore();

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}



