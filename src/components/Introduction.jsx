import React, { useEffect, useRef, useCallback } from "react";

// ─── Text Layout ────────────────────────────────────────────────────────────

const graphemeSegmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
function getGraphemes(text) {
  return Array.from(graphemeSegmenter.segment(text), (s) => s.segment);
}

function computeCharPositions(text, font, maxWidth, lineHeight, offsetX, offsetY) {
  // Manual text layout without external dependency
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = font;

  const words = [];
  const rawLines = text.split("\n");
  for (const rawLine of rawLines) {
    if (rawLine.trim() === "") {
      words.push({ text: "\n", width: 0, isBreak: true });
      continue;
    }
    const tokens = rawLine.split(/(\s+)/);
    for (const token of tokens) {
      if (!token) continue;
      const w = ctx.measureText(token).width;
      words.push({ text: token, width: w, isBreak: false });
    }
    words.push({ text: "\n", width: 0, isBreak: true });
  }

  // Build lines
  const lines = [];
  let currentLine = [];
  let currentWidth = 0;

  for (const word of words) {
    if (word.isBreak) {
      lines.push(currentLine);
      currentLine = [];
      currentWidth = 0;
      continue;
    }
    const isSpace = /^\s+$/.test(word.text);
    if (!isSpace && currentWidth + word.width > maxWidth && currentLine.length > 0) {
      lines.push(currentLine);
      currentLine = [word];
      currentWidth = word.width;
    } else {
      currentLine.push(word);
      currentWidth += word.width;
    }
  }
  if (currentLine.length > 0) lines.push(currentLine);

  const chars = [];
  let lineIdx = 0;
  for (const line of lines) {
    let x = offsetX;
    const y = offsetY + lineIdx * lineHeight;
    for (const word of line) {
      const graphemes = getGraphemes(word.text);
      const charWidth = word.width / Math.max(graphemes.length, 1);
      for (const g of graphemes) {
        const gw = ctx.measureText(g).width || charWidth;
        chars.push({ char: g, x, y, width: gw, lineIndex: lineIdx });
        x += gw;
      }
    }
    lineIdx++;
  }

  return { chars, totalHeight: lineIdx * lineHeight };
}

// ─── Physics ─────────────────────────────────────────────────────────────────

const GRAVITY = 600;
const AIR_RESISTANCE = 0.98;
const SHRAPNEL_DURATION = 1200;
const REASSEMBLE_DURATION = 600;
const FORCE_MULTIPLIER = 40000;

function createParticle(info) {
  return {
    info,
    state: "rest",
    cx: info.x, cy: info.y,
    vx: 0, vy: 0,
    rotation: 0, angularVel: 0,
    opacity: 1,
    shrapnelStart: 0,
    reassembleStart: 0,
    reassembleDuration: REASSEMBLE_DURATION,
    reassembleFromX: 0, reassembleFromY: 0, reassembleFromRotation: 0,
  };
}

function detonateChars(particles, activeIndices, bombX, bombY, blastRadius, now) {
  let count = 0;
  const blastRadiusSq = blastRadius * blastRadius;
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    if (p.state === "shrapnel") continue;
    const cx = p.info.x + p.info.width / 2;
    const cy = p.info.y;
    const dx = cx - bombX, dy = cy - bombY;
    if (Math.abs(dx) > blastRadius || Math.abs(dy) > blastRadius) continue;
    const distSq = dx * dx + dy * dy;
    if (distSq > blastRadiusSq) continue;
    const dist = Math.sqrt(distSq);
    const normalizedDist = Math.max(dist, 30);
    const force = (FORCE_MULTIPLIER / (normalizedDist * normalizedDist)) * blastRadius;
    const angle = Math.atan2(dy, dx);
    const spread = (Math.random() - 0.5) * 0.8;
    const finalAngle = angle + spread;
    const wasRest = p.state === "rest";
    p.state = "shrapnel";
    p.shrapnelStart = now;
    p.vx = Math.cos(finalAngle) * force;
    p.vy = Math.sin(finalAngle) * force - 100 - Math.random() * 150;
    p.angularVel = (Math.random() - 0.5) * 15;
    p.opacity = 1;
    p.cx = p.info.x;
    p.cy = p.info.y;
    if (wasRest) activeIndices.push(i);
    count++;
  }
  return count;
}

function lerp(a, b, t) { return a + (b - a) * t; }
function elasticEaseOut(t) {
  if (t === 0 || t === 1) return t;
  const p = 0.8;
  return Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1;
}

function updateActiveParticles(particles, activeIndices, dt, now) {
  let anyRest = false;
  let write = 0;
  for (let i = 0; i < activeIndices.length; i++) {
    const idx = activeIndices[i];
    const p = particles[idx];
    if (p.state === "shrapnel") {
      const elapsed = now - p.shrapnelStart;
      p.vx *= AIR_RESISTANCE;
      p.vy *= AIR_RESISTANCE;
      p.vy += GRAVITY * dt;
      p.cx += p.vx * dt;
      p.cy += p.vy * dt;
      p.rotation += p.angularVel * dt;
      const fadeStart = SHRAPNEL_DURATION * 0.5;
      if (elapsed > fadeStart) {
        p.opacity = Math.max(0, 1 - (elapsed - fadeStart) / (SHRAPNEL_DURATION - fadeStart));
      }
      if (elapsed >= SHRAPNEL_DURATION) {
        p.state = "reassembling";
        p.reassembleStart = now;
        p.reassembleFromX = p.cx;
        p.reassembleFromY = p.cy;
        p.reassembleFromRotation = p.rotation;
        const rdx = p.cx - p.info.x, rdy = p.cy - p.info.y;
        const d = Math.sqrt(rdx * rdx + rdy * rdy);
        p.reassembleDuration = REASSEMBLE_DURATION + Math.min(d * 0.2, 300);
      }
      activeIndices[write++] = idx;
    } else if (p.state === "reassembling") {
      const elapsed = now - p.reassembleStart;
      let t = Math.min(1, elapsed / p.reassembleDuration);
      t = elasticEaseOut(t);
      p.cx = lerp(p.reassembleFromX, p.info.x, t);
      p.cy = lerp(p.reassembleFromY, p.info.y, t);
      p.rotation = lerp(p.reassembleFromRotation, 0, t);
      p.opacity = Math.min(1, 0.2 + t * 0.8);
      if (elapsed >= p.reassembleDuration) {
        p.state = "rest";
        p.cx = p.info.x; p.cy = p.info.y;
        p.rotation = 0; p.opacity = 1;
        p.vx = 0; p.vy = 0; p.angularVel = 0;
        anyRest = true;
      } else {
        activeIndices[write++] = idx;
      }
    }
  }
  activeIndices.length = write;
  return anyRest;
}

// ─── Bomb ────────────────────────────────────────────────────────────────────

const FUSE_DURATION = 1500;
const BLAST_RADIUS = 220;
const BLAST_WAVE_MAX_RADIUS = 380;
const BLAST_WAVE_DURATION = 500;

function createBomb(x, y, now) {
  return {
    x, y, state: "fuse",
    fuseStart: now, fuseDuration: FUSE_DURATION,
    detonateTime: 0,
    blastRadius: BLAST_RADIUS,
    blastWaveRadius: 0,
    blastWaveMaxRadius: BLAST_WAVE_MAX_RADIUS,
    blastWaveDuration: BLAST_WAVE_DURATION,
  };
}

function updateBomb(bomb, now) {
  if (bomb.state === "fuse") {
    if (now - bomb.fuseStart >= bomb.fuseDuration) {
      bomb.state = "detonating";
      bomb.detonateTime = now;
    }
  } else if (bomb.state === "detonating") {
    const elapsed = now - bomb.detonateTime;
    bomb.blastWaveRadius = (elapsed / bomb.blastWaveDuration) * bomb.blastWaveMaxRadius;
    if (elapsed >= bomb.blastWaveDuration) bomb.state = "done";
  }
}

function drawBomb(ctx, bomb, now) {
  if (bomb.state === "fuse") {
    const elapsed = now - bomb.fuseStart;
    const progress = elapsed / bomb.fuseDuration;
    const pulse = 1 + 0.3 * Math.sin(elapsed * 0.02);
    const radius = 14 * pulse;
    ctx.beginPath();
    ctx.arc(bomb.x, bomb.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "#1a1a1a";
    ctx.fill();
    ctx.strokeStyle = "#ff4400";
    ctx.lineWidth = 2.5;
    ctx.stroke();
    const fuseLen = 20 * (1 - progress);
    const fuseAngle = -Math.PI / 4;
    const fx = bomb.x + Math.cos(fuseAngle) * radius;
    const fy = bomb.y + Math.sin(fuseAngle) * radius;
    const fex = fx + Math.cos(fuseAngle) * fuseLen;
    const fey = fy + Math.sin(fuseAngle) * fuseLen;
    ctx.beginPath();
    ctx.moveTo(fx, fy);
    ctx.lineTo(fex, fey);
    ctx.strokeStyle = "#ff8800";
    ctx.lineWidth = 2;
    ctx.stroke();
    if (fuseLen > 1) {
      const sparkSize = 4 + Math.random() * 4;
      ctx.beginPath();
      ctx.arc(fex, fey, sparkSize, 0, Math.PI * 2);
      const grad = ctx.createRadialGradient(fex, fey, 0, fex, fey, sparkSize);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.4, "#ffcc00");
      grad.addColorStop(1, "rgba(255,68,0,0)");
      ctx.fillStyle = grad;
      ctx.fill();
    }
    const glowRadius = 30 * pulse;
    const glow = ctx.createRadialGradient(bomb.x, bomb.y, radius, bomb.x, bomb.y, glowRadius);
    glow.addColorStop(0, `rgba(255,68,0,${0.3 * pulse})`);
    glow.addColorStop(1, "rgba(255,68,0,0)");
    ctx.beginPath();
    ctx.arc(bomb.x, bomb.y, glowRadius, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();
  } else if (bomb.state === "detonating") {
    const elapsed = now - bomb.detonateTime;
    const progress = elapsed / bomb.blastWaveDuration;
    if (progress < 0.15) {
      const flashAlpha = 1 - progress / 0.15;
      const flashRadius = 60 * (progress / 0.15);
      const flash = ctx.createRadialGradient(bomb.x, bomb.y, 0, bomb.x, bomb.y, flashRadius);
      flash.addColorStop(0, `rgba(255,255,255,${flashAlpha})`);
      flash.addColorStop(0.5, `rgba(255,200,50,${flashAlpha * 0.7})`);
      flash.addColorStop(1, "rgba(255,68,0,0)");
      ctx.beginPath();
      ctx.arc(bomb.x, bomb.y, flashRadius, 0, Math.PI * 2);
      ctx.fillStyle = flash;
      ctx.fill();
    }
    if (progress < 1) {
      const waveRadius = bomb.blastWaveRadius;
      const ringWidth = 30 * (1 - progress * 0.5);
      const alpha = 0.6 * (1 - progress);
      ctx.beginPath();
      ctx.arc(bomb.x, bomb.y, waveRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,140,0,${alpha})`;
      ctx.lineWidth = ringWidth;
      ctx.stroke();
      const innerGlow = ctx.createRadialGradient(
        bomb.x, bomb.y, Math.max(0, waveRadius - ringWidth),
        bomb.x, bomb.y, waveRadius
      );
      innerGlow.addColorStop(0, "rgba(255,200,50,0)");
      innerGlow.addColorStop(0.5, `rgba(255,140,0,${alpha * 0.3})`);
      innerGlow.addColorStop(1, "rgba(255,68,0,0)");
      ctx.beginPath();
      ctx.arc(bomb.x, bomb.y, waveRadius, 0, Math.PI * 2);
      ctx.fillStyle = innerGlow;
      ctx.fill();
    }
  }
}

// ─── Renderer ────────────────────────────────────────────────────────────────

const CHAR_COLORS = { rest: "#ffffff", shrapnel: "#c0440a", reassembling: "#6b7c5e" };
const BG_COLOR = "#1a1a1a";
const SPARK_COLORS = ["#ffcc00", "#ff8800", "#ff4400", "#ffffff", "#ffaa22"];

function pushDetonationSparks(sparks, bx, by, count) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 100 + Math.random() * 400;
    const life = 300 + Math.random() * 700;
    sparks.push({
      x: bx, y: by,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 50,
      life, maxLife: life,
      size: 1.5 + Math.random() * 3,
      color: SPARK_COLORS[i % 5],
    });
  }
}

function pushFuseSparks(sparks, x, y) {
  const count = 2 + Math.floor(Math.random() * 3);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 20 + Math.random() * 60;
    sparks.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 30,
      life: 150 + Math.random() * 200,
      maxLife: 350,
      size: 1 + Math.random() * 2,
      color: Math.random() > 0.5 ? "#ffcc00" : "#ff8800",
    });
  }
}

function updateSparks(sparks, dt) {
  let write = 0;
  for (let i = 0; i < sparks.length; i++) {
    const s = sparks[i];
    s.x += s.vx * dt; s.y += s.vy * dt;
    s.vy += 300 * dt;
    s.vx *= 0.98;
    s.life -= dt * 1000;
    if (s.life > 0) sparks[write++] = s;
  }
  sparks.length = write;
}

// ─── Main Component ──────────────────────────────────────────────────────────

const FONT_SIZE = 20;
const LINE_HEIGHT = 32;
const X_PADDING = 30;
const Y_PADDING = 30;

// The intro text rendered on canvas
const INTRO_TEXT = `The archives of antiquity are being unsealed.
Dust settles over the ruins of the old empire...

A lost chapter is currently being transcribed.
The scribes are preparing the next chronicle.
Wait for the ravens to deliver the new scroll...`;

const Introduction = () => {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    particles: [],
    activeIndices: [],
    bombs: [],
    sparks: [],
    shake: null,
    lastTime: 0,
    dpr: 1,
    restDirty: true,
    restCanvas: null,
    restCtx: null,
    animId: null,
    canvasHeight: 0,
  });

  const getFont = useCallback((dpr = 1) => {
    return `${FONT_SIZE * dpr}px "Poppins", serif`;
  }, []);

  const layoutText = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const s = stateRef.current;
    s.dpr = window.devicePixelRatio || 1;

    const maxWidth = Math.min(canvas.offsetWidth - X_PADDING * 2, 640);
    const offsetX = X_PADDING;
    const offsetY = Y_PADDING;

    const { chars, totalHeight } = computeCharPositions(
      INTRO_TEXT,
      getFont(1),
      maxWidth,
      LINE_HEIGHT,
      offsetX,
      offsetY
    );

    s.canvasHeight = Math.max(300, totalHeight + offsetY + Y_PADDING);

    // Resize canvas
    canvas.width = canvas.offsetWidth * s.dpr;
    canvas.height = s.canvasHeight * s.dpr;
    canvas.style.height = s.canvasHeight + "px";

    // Rebuild particles, reuse existing state
    const oldMap = new Map();
    for (const p of s.particles) {
      const key = `${p.info.lineIndex}:${p.info.x.toFixed(1)}:${p.info.char}`;
      oldMap.set(key, p);
    }
    s.particles = chars.map((info) => {
      const key = `${info.lineIndex}:${info.x.toFixed(1)}:${info.char}`;
      const ex = oldMap.get(key);
      if (ex) { ex.info = info; return ex; }
      return createParticle(info);
    });
    s.activeIndices = [];
    for (let i = 0; i < s.particles.length; i++) {
      if (s.particles[i].state !== "rest") s.activeIndices.push(i);
    }
    s.restDirty = true;
    s.restCanvas = null;
  }, [getFont]);

  const renderRestText = useCallback((ctx, dpr, canvasW, canvasH, particles) => {
    const s = stateRef.current;
    if (!s.restDirty && s.restCanvas) return s.restCanvas;

    if (!s.restCanvas || s.restCanvas.width !== canvasW || s.restCanvas.height !== canvasH) {
      s.restCanvas = new OffscreenCanvas(canvasW, canvasH);
      s.restCtx = s.restCanvas.getContext("2d");
      s.restDirty = true;
    }
    if (!s.restDirty) return s.restCanvas;

    const rc = s.restCtx;
    rc.clearRect(0, 0, canvasW, canvasH);
    rc.font = getFont(dpr);
    rc.textBaseline = "top";
    rc.textAlign = "left";
    rc.fillStyle = CHAR_COLORS.rest;

    for (const p of particles) {
      if (p.state !== "rest") continue;
      rc.fillText(p.info.char, p.info.x * dpr, p.info.y * dpr);
    }
    s.restDirty = false;
    return s.restCanvas;
  }, [getFont]);

  const gameLoop = useCallback((timestamp) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const s = stateRef.current;
    const dt = s.lastTime === 0 ? 0.016 : Math.min((timestamp - s.lastTime) / 1000, 0.05);
    s.lastTime = timestamp;
    const now = performance.now();
    let restCacheDirty = false;

    // Update bombs
    for (let i = s.bombs.length - 1; i >= 0; i--) {
      const bomb = s.bombs[i];
      const prevState = bomb.state;
      updateBomb(bomb, now);
      if (prevState === "fuse" && bomb.state === "detonating") {
        const count = detonateChars(s.particles, s.activeIndices, bomb.x, bomb.y, bomb.blastRadius, now);
        if (count > 0) restCacheDirty = true;
        s.shake = { startTime: now, duration: 400, intensity: 12 };
        pushDetonationSparks(s.sparks, bomb.x, bomb.y, 80);
      }
      if (bomb.state === "fuse") {
        const elapsed = now - bomb.fuseStart;
        const progress = elapsed / bomb.fuseDuration;
        const pulse = 1 + 0.3 * Math.sin(elapsed * 0.02);
        const radius = 14 * pulse;
        const fuseLen = 20 * (1 - progress);
        const fuseAngle = -Math.PI / 4;
        const fx = bomb.x + Math.cos(fuseAngle) * radius;
        const fy = bomb.y + Math.sin(fuseAngle) * radius;
        const fex = fx + Math.cos(fuseAngle) * fuseLen;
        const fey = fy + Math.sin(fuseAngle) * fuseLen;
        if (Math.random() < 0.3) pushFuseSparks(s.sparks, fex, fey);
      }
      if (bomb.state === "done") s.bombs.splice(i, 1);
    }

    const anyRest = updateActiveParticles(s.particles, s.activeIndices, dt, now);
    if (anyRest) restCacheDirty = true;
    if (restCacheDirty) s.restDirty = true;
    updateSparks(s.sparks, dt);

    const shakeActive = s.shake && now - s.shake.startTime < s.shake.duration;
    const hasActivity = s.activeIndices.length > 0 || s.bombs.length > 0 || s.sparks.length > 0 || shakeActive;

    if (!hasActivity && !s.restDirty) {
      s.animId = requestAnimationFrame(gameLoop);
      return;
    }

    const dpr = s.dpr;
    ctx.save();

    // Screen shake
    if (shakeActive) {
      const progress = (now - s.shake.startTime) / s.shake.duration;
      const decay = 1 - progress;
      const intensity = s.shake.intensity * decay;
      ctx.translate((Math.random() - 0.5) * 2 * intensity * dpr, (Math.random() - 0.5) * 2 * intensity * dpr);
    }

    // Background
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Paper lines
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 1;
    const lineSpacing = 28 * dpr;
    for (let y = lineSpacing; y < canvas.height; y += lineSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Vignette
    const vg = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) * 0.3,
      canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) * 0.7
    );
    vg.addColorStop(0, "rgba(0,0,0,0)");
    vg.addColorStop(1, "rgba(0,0,0,0.05)");
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Rest text (cached)
    const restCanvas = renderRestText(ctx, dpr, canvas.width, canvas.height, s.particles);
    if (restCanvas) ctx.drawImage(restCanvas, 0, 0);

    // Active (animated) characters
    if (s.activeIndices.length > 0) {
      ctx.font = getFont(dpr);
      ctx.textBaseline = "top";
      const halfLH = (LINE_HEIGHT * dpr) / 2;
      const baseTransform = ctx.getTransform();
      for (const idx of s.activeIndices) {
        const p = s.particles[idx];
        if (p.opacity <= 0.01) continue;
        const hw = (p.info.width * dpr) / 2;
        const centerX = p.cx * dpr + hw;
        const centerY = p.cy * dpr + halfLH;
        const cos = Math.cos(p.rotation);
        const sin = Math.sin(p.rotation);
        ctx.setTransform(
          baseTransform.a * cos + baseTransform.c * sin,
          baseTransform.b * cos + baseTransform.d * sin,
          baseTransform.a * -sin + baseTransform.c * cos,
          baseTransform.b * -sin + baseTransform.d * cos,
          baseTransform.a * centerX + baseTransform.c * centerY + baseTransform.e,
          baseTransform.b * centerX + baseTransform.d * centerY + baseTransform.f,
        );
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.state === "shrapnel" ? CHAR_COLORS.shrapnel : CHAR_COLORS.reassembling;
        ctx.fillText(p.info.char, -hw, -halfLH);
      }
      ctx.setTransform(baseTransform);
      ctx.globalAlpha = 1;
    }

    // Bombs
    if (s.bombs.length > 0) {
      ctx.save();
      ctx.scale(dpr, dpr);
      for (const bomb of s.bombs) drawBomb(ctx, bomb, now);
      ctx.restore();
    }

    // Sparks
    for (const sp of s.sparks) {
      ctx.globalAlpha = sp.life / sp.maxLife;
      ctx.beginPath();
      ctx.arc(sp.x * dpr, sp.y * dpr, sp.size * dpr, 0, Math.PI * 2);
      ctx.fillStyle = sp.color;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.restore();

    s.animId = requestAnimationFrame(gameLoop);
  }, [getFont, renderRestText]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Wait for fonts to load before laying out text
    document.fonts.ready.then(() => {
      layoutText();
    });

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      stateRef.current.bombs.push(createBomb(x, y, performance.now()));
    };

    const handleResize = () => {
      document.fonts.ready.then(() => {
        layoutText();
      });
    };

    canvas.addEventListener("click", handleClick);
    window.addEventListener("resize", handleResize);

    const s = stateRef.current;
    s.animId = requestAnimationFrame(gameLoop);

    return () => {
      canvas.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
      if (s.animId) cancelAnimationFrame(s.animId);
    };
  }, [layoutText, gameLoop]);

  return (
    <section className="bg-transparent px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 text-left text-slate-700" style={{ position: "relative" }}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
          hey! I&apos;m <span className="text-pink-400">Swap</span>
        </h1>
        <div className="text-sm sm:text-base mt-2 mb-4">aka <span className="text-green-200">crisplettuce</span></div>
      {/* Canvas renders the intro text with bomb effect */}
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          cursor: "crosshair",
          borderRadius: "4px",
        }}
        title="Click anywhere to place a bomb!"
      />

      <div className="mt-4 sm:mt-6 flex flex-col xs:flex-row flex-wrap items-start xs:items-center gap-3 sm:gap-4 text-slate-600">
          {/* Resume button - Responsive Sizing [web:20] */}

          {/* Social Icons - Responsive Spacing and Size [web:18] */}
          <div className="flex items-center gap-4 sm:gap-5 w-full xs:w-auto">
            <a
              href="https://drive.google.com/file/d/1PYeu5RQ7j1iIo1yBSMnffvjR8B-DtpG-/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-pink-400 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white hover:bg-pink-500 transition-colors duration-200 w-2/6 xs:w-auto"
            >
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Resume
            </a>
            <a
              href="https://github.com/grilled-swampert"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="hover:text-slate-800 transition-colors duration-200 active:scale-95"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 sm:h-7 sm:w-7"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .5C5.73.5.75 5.64.75 12c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.26.79-.57v-2c-3.2.72-3.88-1.4-3.88-1.4-.52-1.36-1.27-1.72-1.27-1.72-1.04-.73.08-.72.08-.72 1.15.08 1.76 1.2 1.76 1.2 1.02 1.78 2.68 1.27 3.33.97.1-.76.4-1.27.73-1.56-2.55-.3-5.23-1.3-5.23-5.8 0-1.28.45-2.33 1.19-3.15-.12-.3-.52-1.53.11-3.18 0 0 .97-.32 3.18 1.2a10.7 10.7 0 0 1 2.9-.4c.98 0 1.96.13 2.9.4 2.2-1.52 3.17-1.2 3.17-1.2.64 1.65.24 2.88.12 3.18.74.82 1.19 1.87 1.19 3.15 0 4.51-2.68 5.5-5.24 5.79.41.36.78 1.08.78 2.18v3.23c0 .32.21.69.8.57A11.27 11.27 0 0 0 23.25 12C23.25 5.64 18.27.5 12 .5z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/swapnil-ranadive-crispy/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="hover:text-slate-800 transition-colors duration-200 active:scale-95"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 sm:h-7 sm:w-7"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.45 20.45h-3.55v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.66H9.37V9h3.41v1.56h.05c.48-.9 1.65-1.85 3.39-1.85 3.62 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
            </a>

            <a
              href="mailto:swapnil.ranadive101@gmail.com"
              aria-label="Email"
              title="Email"
              className="hover:text-slate-800 transition-colors duration-200 active:scale-95"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 sm:h-7 sm:w-7"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
          </div>
      </div>
    </section>
  );
};

export default Introduction;