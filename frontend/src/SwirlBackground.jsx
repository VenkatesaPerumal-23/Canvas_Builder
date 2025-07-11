import React, { useEffect } from "react";
import { createNoise3D } from "simplex-noise";
import alea from "alea";

const SwirlBackground = () => {
  useEffect(() => {
    const particleCount = 700;
    const particlePropCount = 9;
    const particlePropsLength = particleCount * particlePropCount;
    const rangeY = 100;
    const baseTTL = 50;
    const rangeTTL = 150;
    const baseSpeed = 0.1;
    const rangeSpeed = 2;
    const baseRadius = 1;
    const rangeRadius = 4;
    const baseHue = 220;
    const rangeHue = 100;
    const noiseSteps = 8;
    const xOff = 0.00125;
    const yOff = 0.00125;
    const zOff = 0.0005;
    const backgroundColor = "hsla(260,40%,5%,1)";

    let canvas, ctx, center, particleProps, tick, noise3D;

    const rand = (n = 1) => n * Math.random();
    const randRange = (n) => n - rand(n * 2);
    const fadeInOut = (t, m) => {
      const hm = 0.5 * m;
      return Math.abs((t + hm) % m - hm) / hm;
    };
    const lerp = (a, b, t) => a + (b - a) * t;

    const createCanvas = () => {
      canvas = document.createElement("canvas");
      canvas.style.position = "fixed";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.zIndex = "-1";
      canvas.style.pointerEvents = "none";
      document.body.appendChild(canvas);
      ctx = canvas.getContext("2d");
      center = [];
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      center[0] = 0.5 * canvas.width;
      center[1] = 0.5 * canvas.height;
    };

    const initParticles = () => {
      tick = 0;
      noise3D = createNoise3D(alea("swirl-background"));
      particleProps = new Float32Array(particlePropsLength);

      for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        initParticle(i);
      }
    };

    const initParticle = (i) => {
      const x = rand(canvas.width);
      const y = center[1] + randRange(rangeY);
      const vx = 0;
      const vy = 0;
      const life = 0;
      const ttl = baseTTL + rand(rangeTTL);
      const speed = baseSpeed + rand(rangeSpeed);
      const radius = baseRadius + rand(rangeRadius);
      const hue = baseHue + rand(rangeHue);

      particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
    };

    const drawParticle = (x, y, x2, y2, life, ttl, radius, hue) => {
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineWidth = radius;
      ctx.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    };

    const updateParticle = (i) => {
      const i2 = i + 1,
        i3 = i + 2,
        i4 = i + 3,
        i5 = i + 4,
        i6 = i + 5,
        i7 = i + 6,
        i8 = i + 7,
        i9 = i + 8;

      const x = particleProps[i];
      const y = particleProps[i2];
      const n = noise3D(x * xOff, y * yOff, tick * zOff) * noiseSteps * Math.PI * 2;
      const vx = lerp(particleProps[i3], Math.cos(n), 0.5);
      const vy = lerp(particleProps[i4], Math.sin(n), 0.5);
      const life = particleProps[i5];
      const ttl = particleProps[i6];
      const speed = particleProps[i7];
      const x2 = x + vx * speed;
      const y2 = y + vy * speed;
      const radius = particleProps[i8];
      const hue = particleProps[i9];

      drawParticle(x, y, x2, y2, life, ttl, radius, hue);

      particleProps[i] = x2;
      particleProps[i2] = y2;
      particleProps[i3] = vx;
      particleProps[i4] = vy;
      particleProps[i5] = life + 1;

      if (x2 < 0 || x2 > canvas.width || y2 < 0 || y2 > canvas.height || life > ttl) {
        initParticle(i);
      }
    };

    const draw = () => {
      tick++;
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        updateParticle(i);
      }

      requestAnimationFrame(draw);
    };

    createCanvas();
    resize();
    initParticles();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      canvas.remove();
    };
  }, []);

  return null;
};

export default SwirlBackground;
