import React, { useEffect, useRef } from "react";

export const AnimatedCanvas = ({ drawFunction, width, height, colorFunc }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const drawAnimatedBorder = (ctx, frame, width, height, borderFunc) => {
    const borderProgress = (frame % 400) / 400; // 400 frames for a full border cycle
    const borderLength = (width + height) * 2;
    const currentLength = borderLength * borderProgress;

    ctx.strokeStyle = borderFunc(frame)
    ctx.lineWidth = 2;
    ctx.beginPath();

    if (currentLength < width) {
      ctx.moveTo(0, 0);
      ctx.lineTo(currentLength, 0);
    } else if (currentLength < width + height) {
      ctx.moveTo(0, 0);
      ctx.lineTo(width, 0);
      ctx.lineTo(width, currentLength - width);
    } else if (currentLength < 2 * width + height) {
      ctx.moveTo(0, 0);
      ctx.lineTo(width, 0);
      ctx.lineTo(width, height);
      ctx.lineTo(width - (currentLength - width - height), height);
    } else {
      ctx.moveTo(0, 0);
      ctx.lineTo(width, 0);
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.lineTo(0, height - (currentLength - 2 * width - height));
    }

    ctx.stroke();
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      // Draw the main content
      drawFunction(ctx, frame, colorFunc);
      // Draw animated border
      drawAnimatedBorder(ctx, frame, width, height, colorFunc);

      frame++;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationRef.current);
  }, [drawFunction, width, height, colorFunc]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

const drawCloakedFigure = (ctx, frame) => {
  ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
  ctx.lineWidth = 2;

  const baseY = ctx.canvas.height * 0.8;
  const middleX = ctx.canvas.width / 2;
  const upperY = ctx.canvas.height * 0.3;

  const lines = [
    [middleX, baseY, middleX - 25, baseY - 50],
    [middleX - 25, baseY - 50, middleX - 10, upperY],
    [middleX - 10, upperY, middleX + 10, upperY],
    [middleX + 10, upperY, middleX + 25, baseY - 50],
    [middleX + 25, baseY - 50, middleX, baseY],
  ];

  const lineIndex = Math.floor(frame / 60) % lines.length;
  const lineProgress = (frame % 60) / 60;

  if (lineIndex < lines.length) {
    const [startX, startY, endX, endY] = lines[lineIndex];
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(
      startX + (endX - startX) * lineProgress,
      startY + (endY - startY) * lineProgress
    );
    ctx.stroke();
  }
};
