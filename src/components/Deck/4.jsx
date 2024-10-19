// import React, { useEffect, useRef } from 'react';
// // auto drawing line and repeat

// const MysticCanvas = ({ width, height }) => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     let frame = 0;
//     const totalFrames = 1800; // 30 seconds at 60fps

//     const drawFrame = () => {
//       ctx.strokeStyle = 'white';
//       ctx.lineWidth = 2;

//       const progress = frame / totalFrames;

//       // Draw card frame
//       if (progress <= 0.1) {
//         drawCardFrame(ctx, width, height, progress / 0.1);
//       }

//       // Draw hooded figure
//       if (progress > 0.1 && progress <= 0.3) {
//         drawHoodedFigure(ctx, width, height, (progress - 0.1) / 0.2);
//       }

//       // Draw cosmic background and nebula
//       if (progress > 0.3 && progress <= 0.5) {
//         drawCosmicBackground(ctx, width, height, (progress - 0.3) / 0.2, frame);
//       }

//       // Draw magical symbol
//       if (progress > 0.5 && progress <= 0.7) {
//         drawMagicalSymbol(ctx, width, height, (progress - 0.5) / 0.2);
//       }

//       // Draw planets and stars
//       if (progress > 0.7 && progress <= 0.9) {
//         drawPlanetsAndStars(ctx, width, height, (progress - 0.7) / 0.2, frame);
//       }

//       // Draw additional details
//       if (progress > 0.9) {
//         drawAdditionalDetails(ctx, width, height, (progress - 0.9) / 0.1, frame);
//       }

//       frame++;
//       if (frame < totalFrames) {
//         requestAnimationFrame(drawFrame);
//       }
//     };

//     drawFrame();

//     return () => {
//       // Clean up animation if needed
//     };
//   }, [width, height]);

//   return <canvas ref={canvasRef} width={width} height={height} />;
// };

// function drawCardFrame(ctx, width, height, progress) {
//   const frameWidth = width * 0.9;
//   const frameHeight = height * 0.9;
//   const startX = width * 0.05;
//   const startY = height * 0.05;

//   ctx.beginPath();
//   ctx.moveTo(startX, startY);
//   if (progress <= 0.25) ctx.lineTo(startX + frameWidth * (progress / 0.25), startY);
//   else if (progress <= 0.5) ctx.lineTo(startX + frameWidth, startY + frameHeight * ((progress - 0.25) / 0.25));
//   else if (progress <= 0.75) ctx.lineTo(startX + frameWidth - frameWidth * ((progress - 0.5) / 0.25), startY + frameHeight);
//   else ctx.lineTo(startX, startY + frameHeight - frameHeight * ((progress - 0.75) / 0.25));
//   ctx.stroke();
// }

// function drawHoodedFigure(ctx, width, height, progress) {
//   const centerX = width * 0.5;
//   const topY = height * 0.2;
//   const bottomY = height * 0.8;

//   ctx.beginPath();
//   ctx.moveTo(centerX, topY);
//   if (progress <= 0.5) {
//     ctx.lineTo(centerX - width * 0.2 * (progress / 0.5), topY + (bottomY - topY) * (progress / 0.5));
//   } else {
//     ctx.lineTo(centerX - width * 0.2, bottomY);
//     ctx.lineTo(centerX - width * 0.2 + width * 0.4 * ((progress - 0.5) / 0.5), bottomY);
//   }
//   ctx.stroke();

//   // Draw hands
//   if (progress > 0.7) {
//     const handProgress = (progress - 0.7) / 0.3;
//     ctx.beginPath();
//     ctx.moveTo(centerX - width * 0.15, height * 0.6);
//     ctx.lineTo(centerX - width * 0.25 * handProgress, height * (0.6 + 0.1 * handProgress));
//     ctx.moveTo(centerX + width * 0.15, height * 0.6);
//     ctx.lineTo(centerX + width * 0.25 * handProgress, height * (0.6 + 0.1 * handProgress));
//     ctx.stroke();
//   }
// }

// function drawCosmicBackground(ctx, width, height, progress, frame) {
//   // Draw nebula-like swirls
//   const swirls = 5;
//   for (let i = 0; i < swirls; i++) {
//     const centerX = width * (0.2 + 0.6 * (i / swirls));
//     const centerY = height * (0.3 + 0.4 * (i % 2));
//     const radius = width * 0.2;
//     const startAngle = (i / swirls) * Math.PI * 2;
//     const endAngle = startAngle + (Math.PI * 2 * progress);

//     ctx.beginPath();
//     ctx.arc(centerX, centerY, radius, startAngle, endAngle);
//     ctx.stroke();
//   }
// }

// function drawMagicalSymbol(ctx, width, height, progress) {
//   const centerX = width * 0.3;
//   const centerY = height * 0.4;
//   const radius = width * 0.1;

//   ctx.beginPath();
//   ctx.arc(centerX, centerY, radius * progress, 0, Math.PI * 2);
//   ctx.stroke();

//   if (progress > 0.5) {
//     const innerProgress = (progress - 0.5) * 2;
//     ctx.beginPath();
//     ctx.moveTo(centerX - radius * innerProgress, centerY);
//     ctx.lineTo(centerX + radius * innerProgress, centerY);
//     ctx.moveTo(centerX, centerY - radius * innerProgress);
//     ctx.lineTo(centerX, centerY + radius * innerProgress);
//     ctx.stroke();
//   }
// }

// function drawPlanetsAndStars(ctx, width, height, progress, frame) {
//   // Draw planets
//   const planets = [
//     { x: width * 0.2, y: height * 0.7, size: width * 0.05 },
//     { x: width * 0.8, y: height * 0.3, size: width * 0.08 },
//     { x: width * 0.5, y: height * 0.8, size: width * 0.03 },
//   ];

//   planets.forEach((planet, index) => {
//     const planetProgress = Math.max(0, Math.min(1, progress * 3 - index));
//     ctx.beginPath();
//     ctx.arc(planet.x, planet.y, planet.size * planetProgress, 0, Math.PI * 2);
//     ctx.stroke();
//   });

//   // Draw stars
//   const totalStars = 50;
//   const starsToShow = Math.floor(totalStars * progress);

//   for (let i = 0; i < starsToShow; i++) {
//     const x = Math.random() * width;
//     const y = Math.random() * height;
//     const size = (Math.sin(frame * 0.1 + i) * 1.5 + 1.5);
//     ctx.beginPath();
//     ctx.moveTo(x - size, y);
//     ctx.lineTo(x + size, y);
//     ctx.moveTo(x, y - size);
//     ctx.lineTo(x, y + size);
//     ctx.stroke();
//   }
// }

// function drawAdditionalDetails(ctx, width, height, progress, frame) {
//   // Draw Roman numeral III
//   ctx.font = `${Math.floor(width * 0.1 * progress)}px serif`;
//   ctx.fillStyle = 'white';
//   ctx.fillText('III', width * 0.45, height * 0.15);

//   // Draw glowing effect around the magical symbol
//   const centerX = width * 0.3;
//   const centerY = height * 0.4;
//   const radius = width * 0.12;

//   ctx.save();
//   ctx.globalAlpha = 0.5 + Math.sin(frame * 0.05) * 0.5;
//   ctx.beginPath();
//   ctx.arc(centerX, centerY, radius * progress, 0, Math.PI * 2);
//   ctx.stroke();
//   ctx.restore();
// }

// export default MysticCanvas;

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

  const drawCloakedFigure = (ctx, lineIndex) => {
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;

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

    const lineProgress = lineIndex % 20 / 20;
    const currentLineIndex = Math.floor(lineIndex / 20);

    if (currentLineIndex < lines.length) {
      const [startX, startY, endX, endY] = lines[currentLineIndex];
      drawLine(ctx, startX, startY, endX, endY, lineProgress);
    }

    // Draw cloak details
    if (currentLineIndex >= lines.length) {
      const detailIndex = currentLineIndex - lines.length;
      if (detailIndex < 5) {
        const detailProgress = lineProgress;
        ctx.beginPath();
        ctx.moveTo(middleX - 40, baseY - 20 * detailIndex);
        ctx.quadraticCurveTo(
          middleX,
          baseY - 20 * detailIndex - 10 * detailProgress,
          middleX - 40 + 80 * detailProgress,
          baseY - 20 * detailIndex
        );
        ctx.stroke();
      }
    }
  };

  const drawSymbols = (ctx, lineIndex) => {
    ctx.strokeStyle = "#00ffff";
    ctx.lineWidth = 2;

    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const radius = 50;

    if (lineIndex < 120) {
      // Draw circle
      const angle = (lineIndex / 120) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, angle);
      ctx.stroke();
    } else if (lineIndex < 140) {
      // Draw star
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      const starIndex = lineIndex - 120;
      const points = 5;
      const angle = Math.PI / points;
      const starRadius = 40;

      if (starIndex < points * 2) {
        const lineProgress = (starIndex % 2) / 2;
        ctx.beginPath();
        const r = starIndex % 2 === 0 ? starRadius : starRadius / 2;
        const x = centerX + r * Math.sin(Math.floor(starIndex / 2) * angle);
        const y = centerY - r * Math.cos(Math.floor(starIndex / 2) * angle);
        ctx.moveTo(centerX, centerY);
        drawLine(ctx, centerX, centerY, x, y, lineProgress);
      }
    }
  };

  const drawPlanets = (ctx, lineIndex) => {
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;

    const planets = [
      { x: 0.8, y: 0.3, size: 25 },
      { x: 0.6, y: 0.7, size: 35 },
      { x: 0.3, y: 0.5, size: 20 }
    ];

    const planetIndex = Math.floor(lineIndex / 40);
    const planetLineIndex = lineIndex % 40;

    if (planetIndex < planets.length) {
      const planet = planets[planetIndex];
      const angle = (planetLineIndex / 40) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(
        ctx.canvas.width * planet.x,
        ctx.canvas.height * planet.y,
        planet.size,
        0,
        angle
      );
      ctx.stroke();
    }
  };

  const animateDrawing = (ctx) => {
    let lineIndex = 0;

    const drawFrame = () => {
      if (lineIndex === 0) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      }

      drawPlanets(ctx, lineIndex);
      drawCloakedFigure(ctx, lineIndex);
      drawSymbols(ctx, lineIndex);

      lineIndex++;
      if (lineIndex < 300) {  // Increased total frames for slower animation
        animationRef.current = requestAnimationFrame(drawFrame);
      }
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
