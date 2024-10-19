
export const drawCloakedFigure = (ctx, frame, colorFunc) => {
  ctx.strokeStyle = colorFunc(frame)
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

export const drawSymbols = (ctx, frame, colorFunc) => {
  ctx.strokeStyle = colorFunc(frame)
  ctx.lineWidth = 1.5;

  const centerX = ctx.canvas.width / 2;
  const centerY = ctx.canvas.height / 2;
  const radius = ctx.canvas.width * 0.3;

  // Draw circle
  const circleProgress = Math.min(1, frame / 180);
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2 * circleProgress);
  ctx.stroke();

  // Draw star
  if (frame > 180) {
    const starFrame = frame - 180;
    const points = 5;
    const angle = Math.PI / points;
    const starRadius = radius * 0.8;

    const lineIndex = Math.floor(starFrame / 30) % (points * 2);
    const lineProgress = (starFrame % 30) / 30;

    if (lineIndex < points * 2) {
      const r = lineIndex % 2 === 0 ? starRadius : starRadius / 2;
      const x = centerX + r * Math.sin(Math.floor(lineIndex / 2) * angle);
      const y = centerY - r * Math.cos(Math.floor(lineIndex / 2) * angle);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + (x - centerX) * lineProgress,
        centerY + (y - centerY) * lineProgress
      );
      ctx.stroke();
    }
  }
};

export const drawPlanets = (ctx, frame, colorFunc) => {
  ctx.strokeStyle = colorFunc(frame)
  ctx.lineWidth = 1;

  const planets = [
    { x: 0.7, y: 0.3, size: ctx.canvas.width * 0.15 },
    { x: 0.3, y: 0.7, size: ctx.canvas.width * 0.2 },
    { x: 0.2, y: 0.4, size: ctx.canvas.width * 0.1 }
  ];

  const planetIndex = Math.floor(frame / 120) % planets.length;
  const planetProgress = (frame % 120) / 120;

  if (planetIndex < planets.length) {
    const planet = planets[planetIndex];
    const angle = Math.PI * 2 * planetProgress;
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

export const drawSpiral = (ctx, frame, colorFunc) => {
  ctx.strokeStyle = colorFunc(frame)
  ctx.lineWidth = 1;

  const centerX = ctx.canvas.width / 2;
  const centerY = ctx.canvas.height / 2;
  const maxRadius = Math.min(ctx.canvas.width, ctx.canvas.height) * 0.4;

  ctx.beginPath();
  for (let i = 0; i < frame; i++) {
    const angle = 0.1 * i;
    const radius = (i / 200) * maxRadius;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
};
