import React, { useEffect, useRef } from "react";

const AnimatedDrawing = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Draw the hooded figure
  const drawHoodedFigure = (ctx, progress) => {
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;

    ctx.beginPath();
    const baseY = ctx.canvas.height * 0.8;
    const middleX = ctx.canvas.width / 2;
    const upperY = ctx.canvas.height * 0.3;

    // Animate part of the hooded cloak
    ctx.moveTo(middleX, baseY);
    ctx.lineTo(middleX - 50 * progress, baseY - 100 * progress);
    ctx.lineTo(middleX - 20 * progress, upperY);
    ctx.lineTo(middleX + 20 * progress, upperY);
    ctx.lineTo(middleX + 50 * progress, baseY - 100 * progress);
    ctx.lineTo(middleX, baseY);
    ctx.stroke();

    // Hands (simple arcs for this example)
    ctx.beginPath();
    ctx.arc(middleX - 40, baseY - 30, 15, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(middleX + 40, baseY - 30, 15, 0, Math.PI * 2);
    ctx.stroke();
  };

  // Draw the glowing sphere
  const drawGlowingSphere = (ctx, progress) => {
    ctx.strokeStyle = "#00ffff";
    ctx.lineWidth = 2;

    // Draw glowing sphere
    ctx.beginPath();
    const radius = 100 * progress;
    ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Adding concentric lines for glowing effect
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, radius + i * 10, 0, Math.PI * 2);
      ctx.stroke();
    }
  };

  // Draw planets and stars
  const drawPlanetsAndStars = (ctx, progress) => {
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;

    // Draw planets with orbital rings
    const planets = [
      { x: 0.8, y: 0.3, size: 50 },
      { x: 0.6, y: 0.7, size: 70 },
      { x: 0.3, y: 0.5, size: 40 },
    ];

    planets.forEach((planet) => {
      ctx.beginPath();
      ctx.arc(ctx.canvas.width * planet.x, ctx.canvas.height * planet.y, planet.size * progress, 0, Math.PI * 2);
      ctx.stroke();

      // Orbital rings
      ctx.beginPath();
      ctx.arc(ctx.canvas.width * planet.x, ctx.canvas.height * planet.y, (planet.size + 10) * progress, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Draw stars as simple lines
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      const starX = Math.random() * ctx.canvas.width;
      const starY = Math.random() * ctx.canvas.height;
      ctx.moveTo(starX, starY - 10 * progress);
      ctx.lineTo(starX, starY + 10 * progress);
      ctx.moveTo(starX - 10 * progress, starY);
      ctx.lineTo(starX + 10 * progress, starY);
      ctx.stroke();
    }
  };

  // Draw swirling galaxies
  const drawGalaxies = (ctx, progress) => {
    ctx.strokeStyle = "#ff00ff";
    ctx.lineWidth = 2;

    // Draw swirling galaxy (simple spirals)
    const centerX = ctx.canvas.width * 0.8;
    const centerY = ctx.canvas.height * 0.2;
    const galaxyRadius = 50 * progress;

    ctx.beginPath();
    for (let i = 0; i < Math.PI * 4; i += 0.1) {
      const x = centerX + galaxyRadius * Math.cos(i) * (i / 10);
      const y = centerY + galaxyRadius * Math.sin(i) * (i / 10);
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  };

  // Animation loop
  const animateDrawing = (ctx) => {
    let progress = 0;

    const drawFrame = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear canvas for each frame

      // Black background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // Draw different parts with animation
      drawPlanetsAndStars(ctx, progress);
      drawHoodedFigure(ctx, progress);
      drawGlowingSphere(ctx, progress);
      drawGalaxies(ctx, progress);

      // Increment progress for animation
      if (progress < 1) {
        progress += 0.01;
        animationRef.current = requestAnimationFrame(drawFrame); // Continue animation
      }
    };

    drawFrame();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Adjust canvas size
    canvas.width = 150;
    canvas.height = 285;

    // Start the animation
    animateDrawing(ctx);

    // Cleanup the animation when component is unmounted
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <canvas ref={canvasRef} width={150} height={285} />
  );
};

export default AnimatedDrawing;
