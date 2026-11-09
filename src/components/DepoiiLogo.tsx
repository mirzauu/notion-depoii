import React from "react";

const ARMS = 7;
const STEPS = 5;

export interface SpiralBlock {
  key: string;
  step: number;
  x: number;
  y: number;
  w: number;
  h: number;
  angle: number;
}

export const SPIRAL_BLOCKS: SpiralBlock[] = Array.from(
  { length: ARMS * STEPS },
  (_, i) => {
    const arm = i % ARMS;
    const step = Math.floor(i / ARMS);
    const r = 13 + step * 7.4;
    const angle = (arm * 360) / ARMS + step * 21;
    const rad = (angle * Math.PI) / 180;
    return {
      key: `${arm}-${step}`,
      step,
      x: +(Math.cos(rad) * r).toFixed(2),
      y: +(Math.sin(rad) * r).toFixed(2),
      w: +(5.2 + step * 2.3).toFixed(2),
      h: +(4.4 + step * 0.9).toFixed(2),
      angle: +(angle + 90).toFixed(1),
    };
  }
);

export function DepoiiMark({
  className = "w-7 h-7",
  title = "Depoii",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="-50 -50 100 100"
      role="img"
      aria-label={title}
      className={`shrink-0 ${className}`}
    >
      <g fill="currentColor">
        {SPIRAL_BLOCKS.map((b) => (
          <rect
            key={b.key}
            x={-b.w / 2}
            y={-b.h / 2}
            width={b.w}
            height={b.h}
            rx={0.6}
            transform={`translate(${b.x} ${b.y}) rotate(${b.angle})`}
          />
        ))}
      </g>
    </svg>
  );
}
