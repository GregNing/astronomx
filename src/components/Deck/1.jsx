// import React, { useEffect, useRef } from "react";

// const AnimatedDrawing = () => {
//   const canvasRef = useRef(null);
//   const animationRef = useRef(null);

//   // Function to draw the cloaked figure
//   const drawCloakedFigure = (ctx, progress) => {
//     ctx.strokeStyle = "#ffffff";
//     ctx.lineWidth = 2;

//     ctx.beginPath();
//     const baseY = ctx.canvas.height * 0.8;
//     const middleX = ctx.canvas.width / 2;
//     const upperY = ctx.canvas.height * 0.3;

//     // Animate part of the cloak
//     ctx.moveTo(middleX, baseY);
//     ctx.lineTo(middleX - 50 * progress, baseY - 100 * progress);
//     ctx.lineTo(middleX - 20 * progress, upperY);
//     ctx.lineTo(middleX + 20 * progress, upperY);
//     ctx.lineTo(middleX + 50 * progress, baseY - 100 * progress);
//     ctx.lineTo(middleX, baseY);
//     ctx.stroke();
//   };

//   // Function to draw geometric symbols
//   const drawSymbols = (ctx, progress) => {
//     ctx.strokeStyle = "#00ffff";
//     ctx.lineWidth = 2;

//     // Draw circle
//     ctx.beginPath();
//     const radius = 100 * progress;
//     ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, radius, 0, Math.PI * 2);
//     ctx.stroke();

//     // Draw star inside circle
//     ctx.beginPath();
//     const starRadius = 50 * progress;
//     const points = 5;
//     const angle = Math.PI / points;
//     for (let i = 0; i <= 2 * points; i++) {
//       const r = i % 2 === 0 ? starRadius : starRadius / 2;
//       const x = ctx.canvas.width / 2 + r * Math.sin(i * angle);
//       const y = ctx.canvas.height / 2 - r * Math.cos(i * angle);
//       ctx.lineTo(x, y);
//     }
//     ctx.stroke();
//   };

//   // Function to draw planets
//   const drawPlanets = (ctx, progress) => {
//     ctx.strokeStyle = "#ffffff";
//     ctx.lineWidth = 1;

//     // Planet 1
//     ctx.beginPath();
//     ctx.arc(ctx.canvas.width * 0.8, ctx.canvas.height * 0.3, 50 * progress, 0, Math.PI * 2);
//     ctx.stroke();

//     // Planet 2
//     ctx.beginPath();
//     ctx.arc(ctx.canvas.width * 0.6, ctx.canvas.height * 0.7, 70 * progress, 0, Math.PI * 2);
//     ctx.stroke();

//     // Planet 3
//     ctx.beginPath();
//     ctx.arc(ctx.canvas.width * 0.3, ctx.canvas.height * 0.5, 40 * progress, 0, Math.PI * 2);
//     ctx.stroke();
//   };

//   // Animation loop
//   const animateDrawing = (ctx) => {
//     let progress = 0;

//     const drawFrame = () => {
//       ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear canvas for each frame

//       // Black background
//       ctx.fillStyle = "#000000";
//       ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

//       // Draw different parts
//       drawPlanets(ctx, progress);
//       drawCloakedFigure(ctx, progress);
//       drawSymbols(ctx, progress);

//       // Increment progress for animation
//       if (progress < 1) {
//         progress += 0.01;
//         animationRef.current = requestAnimationFrame(drawFrame); // Continue animation
//       }
//     };

//     drawFrame();
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     // Adjust canvas size
//     canvas.width = 150;
//     canvas.height = 285;

//     // Start the animation
//     animateDrawing(ctx);

//     // Cleanup the animation when component is unmounted
//     return () => cancelAnimationFrame(animationRef.current);
//   }, []);

//   return (
//     <canvas ref={canvasRef} width={150} height={285} />
//   );
// };

// export default AnimatedDrawing;


// import React, { useEffect, useRef } from "react";

// const AnimatedDrawing = () => {
//   const canvasRef = useRef(null);
//   const animationRef = useRef(null);

//   const drawLine = (ctx, startX, startY, endX, endY, progress) => {
//     ctx.beginPath();
//     ctx.moveTo(startX, startY);
//     ctx.lineTo(
//       startX + (endX - startX) * progress,
//       startY + (endY - startY) * progress
//     );
//     ctx.stroke();
//   };

//   const drawCloakedFigure = (ctx, lineIndex) => {
//     ctx.strokeStyle = "#ffffff";
//     ctx.lineWidth = 2;

//     const baseY = ctx.canvas.height * 0.8;
//     const middleX = ctx.canvas.width / 2;
//     const upperY = ctx.canvas.height * 0.3;

//     const lines = [
//       [middleX, baseY, middleX - 50, baseY - 100],
//       [middleX - 50, baseY - 100, middleX - 20, upperY],
//       [middleX - 20, upperY, middleX + 20, upperY],
//       [middleX + 20, upperY, middleX + 50, baseY - 100],
//       [middleX + 50, baseY - 100, middleX, baseY],
//     ];

//     if (lineIndex < lines.length) {
//       const [startX, startY, endX, endY] = lines[lineIndex];
//       drawLine(ctx, startX, startY, endX, endY, 1);
//     }

//     // Draw cloak details
//     if (lineIndex >= lines.length) {
//       const detailIndex = lineIndex - lines.length;
//       if (detailIndex < 5) {
//         ctx.beginPath();
//         ctx.moveTo(middleX - 40, baseY - 20 * detailIndex);
//         ctx.quadraticCurveTo(
//           middleX,
//           baseY - 20 * detailIndex - 10,
//           middleX + 40,
//           baseY - 20 * detailIndex
//         );
//         ctx.stroke();
//       }
//     }
//   };

//   const drawSymbols = (ctx, lineIndex) => {
//     ctx.strokeStyle = "#00ffff";
//     ctx.lineWidth = 2;

//     const centerX = ctx.canvas.width / 2;
//     const centerY = ctx.canvas.height / 2;
//     const radius = 50;

//     if (lineIndex < 60) {
//       // Draw circle
//       const angle = (lineIndex / 60) * Math.PI * 2;
//       ctx.beginPath();
//       ctx.arc(centerX, centerY, radius, 0, angle);
//       ctx.stroke();
//     } else if (lineIndex < 70) {
//       // Draw star
//       ctx.beginPath();
//       ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
//       ctx.stroke();

//       const starIndex = lineIndex - 60;
//       const points = 5;
//       const angle = Math.PI / points;
//       const starRadius = 40;

//       if (starIndex < points * 2) {
//         ctx.beginPath();
//         const r = starIndex % 2 === 0 ? starRadius : starRadius / 2;
//         const x = centerX + r * Math.sin(starIndex * angle);
//         const y = centerY - r * Math.cos(starIndex * angle);
//         ctx.moveTo(centerX, centerY);
//         ctx.lineTo(x, y);
//         ctx.stroke();
//       }
//     }
//   };

//   const drawPlanets = (ctx, lineIndex) => {
//     ctx.strokeStyle = "#ffffff";
//     ctx.lineWidth = 1;

//     const planets = [
//       { x: 0.8, y: 0.3, size: 25 },
//       { x: 0.6, y: 0.7, size: 35 },
//       { x: 0.3, y: 0.5, size: 20 }
//     ];

//     const planetIndex = Math.floor(lineIndex / 20);
//     const planetLineIndex = lineIndex % 20;

//     if (planetIndex < planets.length) {
//       const planet = planets[planetIndex];
//       const angle = (planetLineIndex / 20) * Math.PI * 2;
//       ctx.beginPath();
//       ctx.arc(
//         ctx.canvas.width * planet.x,
//         ctx.canvas.height * planet.y,
//         planet.size,
//         0,
//         angle
//       );
//       ctx.stroke();
//     }
//   };

//   const animateDrawing = (ctx) => {
//     let lineIndex = 0;

//     const drawFrame = () => {
//       if (lineIndex === 0) {
//         ctx.fillStyle = "#000000";
//         ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//       }

//       drawPlanets(ctx, lineIndex);
//       drawCloakedFigure(ctx, lineIndex);
//       drawSymbols(ctx, lineIndex);

//       lineIndex++;
//       if (lineIndex < 100) {
//         animationRef.current = requestAnimationFrame(drawFrame);
//       }
//     };

//     drawFrame();
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     canvas.width = 150;
//     canvas.height = 285;

//     animateDrawing(ctx);

//     return () => cancelAnimationFrame(animationRef.current);
//   }, []);

//   return <canvas ref={canvasRef} width={150} height={285} />;
// };

// export default AnimatedDrawing;

import React, { useEffect, useRef } from "react";

const AnimatedDrawing = (props) => {
  const { style } = props
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
