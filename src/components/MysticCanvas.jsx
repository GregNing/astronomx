import React, { useEffect, useRef } from "react";

const AnimatedDrawing = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const drawLine = (ctx, startX, startY, endX, endY, progress) => {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(
      startX + (endX - startX) * progress,
      startY + (endY - startY) * progress
    );
    ctx.stroke();
  };

  const drawCloakedFigure = (ctx, frame) => {
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 + Math.sin(frame * 0.05) * 0.5})`;
    ctx.lineWidth = 1 + Math.sin(frame * 0.1) * 0.5;

    const baseY = ctx.canvas.height * 0.8;
    const middleX = ctx.canvas.width / 2;
    const upperY = ctx.canvas.height * 0.3;

    const lines = [
      [middleX, baseY, middleX - 50, baseY - 100],
      [middleX - 50, baseY - 100, middleX - 20, upperY],
      [middleX - 20, upperY, middleX + 20, upperY],
      [middleX + 20, upperY, middleX + 50, baseY - 100],
      [middleX + 50, baseY - 100, middleX, baseY],
    ];

    lines.forEach(([startX, startY, endX, endY]) => {
      const progress = (Math.sin(frame * 0.1) + 1) / 2;
      drawLine(ctx, startX, startY, endX, endY, progress);
    });

    // Draw cloak details
    for (let i = 0; i < 5; i++) {
      const detailProgress = (Math.sin(frame * 0.1 + i * 0.5) + 1) / 2;
      ctx.beginPath();
      ctx.moveTo(middleX - 40, baseY - 20 * i);
      ctx.quadraticCurveTo(
        middleX,
        baseY - 20 * i - 10 * detailProgress,
        middleX + 40,
        baseY - 20 * i
      );
      ctx.stroke();
    }
  };

  const drawSymbols = (ctx, frame) => {
    ctx.strokeStyle = `rgba(0, 255, 255, ${0.5 + Math.sin(frame * 0.05) * 0.5})`;
    ctx.lineWidth = 1 + Math.sin(frame * 0.1) * 0.5;

    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const radius = 50;

    // Draw circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2 * ((Math.sin(frame * 0.05) + 1) / 2));
    ctx.stroke();

    // Draw star
    const points = 5;
    const angle = Math.PI / points;
    const starRadius = 40;

    for (let i = 0; i < points * 2; i++) {
      const progress = (Math.sin(frame * 0.1 + i * 0.5) + 1) / 2;
      const r = i % 2 === 0 ? starRadius : starRadius / 2;
      const x = centerX + r * Math.sin(i * angle);
      const y = centerY - r * Math.cos(i * angle);
      drawLine(ctx, centerX, centerY, x, y, progress);
    }
  };

  const drawPlanets = (ctx, frame) => {
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 + Math.sin(frame * 0.05) * 0.5})`;
    ctx.lineWidth = 1 + Math.sin(frame * 0.1) * 0.5;

    const planets = [
      { x: 0.8, y: 0.3, size: 25 },
      { x: 0.6, y: 0.7, size: 35 },
      { x: 0.3, y: 0.5, size: 20 }
    ];

    planets.forEach((planet, index) => {
      const angle = Math.PI * 2 * ((Math.sin(frame * 0.05 + index) + 1) / 2);
      ctx.beginPath();
      ctx.arc(
        ctx.canvas.width * planet.x,
        ctx.canvas.height * planet.y,
        planet.size,
        0,
        angle
      );
      ctx.stroke();
    });
  };

  const animateDrawing = (ctx) => {
    let frame = 0;

    const drawFrame = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      drawPlanets(ctx, frame);
      drawCloakedFigure(ctx, frame);
      drawSymbols(ctx, frame);

      frame++;
      animationRef.current = requestAnimationFrame(drawFrame);
    };

    drawFrame();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 150;
    canvas.height = 285;

    animateDrawing(ctx);

    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return <canvas ref={canvasRef} width={150} height={285} />;
};

export default AnimatedDrawing;
