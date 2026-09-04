import { useEffect, useRef } from "react";
import { CanvasSpace, Group, Pt } from "pts";

function colorWithAlpha(hex, alpha) {
  const value = hex.replace("#", "");
  if (value.length !== 6) return hex;
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function PtsField({ page, active }) {
  const hostRef = useRef(null);
  const spaceRef = useRef(null);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
    const space = spaceRef.current;
    if (!space) return;
    if (active) space.replay();
    else space.stop();
  }, [active]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const space = new CanvasSpace(host).setup({
      bgcolor: "transparent",
      resize: true,
      retina: true
    });
    spaceRef.current = space;
    const form = space.getForm();
    const seed = page.id.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
    const compact = window.innerWidth < 620;
    const count = compact ? 9 : 16;

    const path = points => {
      const group = new Group();
      points.forEach(point => group.push(new Pt(point[0], point[1])));
      return group;
    };

    const stroke = (points, color, width = 1) => form.strokeOnly(color, width).line(path(points));

    space.add({
      animate: time => {
        if (!activeRef.current) return;
        const size = space.size;
        const width = size.x;
        const height = size.y;
        const center = new Pt(width * 0.5, height * 0.5);
        space.clear();

        if (page.id === "velocity-works") {
          for (let index = 0; index < count; index += 1) {
            const drift = (time * 0.22 + index * (width / count + 70)) % (width + 280) - 140;
            const y = height * (0.14 + index / count * 0.76);
            stroke([[drift - 260, y + 120], [drift + 260, y - 120]], colorWithAlpha(index % 3 ? page.theme.accent2 : page.theme.accent, 0.12 + (index % 4) * 0.03), index % 4 === 0 ? 2 : 1);
          }
          return;
        }

        if (page.id === "north-tide") {
          for (let index = 0; index < count; index += 1) {
            const points = [];
            const segments = compact ? 18 : 34;
            for (let step = 0; step <= segments; step += 1) {
              const progress = step / segments;
              points.push([progress * width, height * (0.4 + index * 0.027) + Math.sin(progress * 7 + index * 0.52 + time * 0.00018) * (8 + index * 0.5)]);
            }
            stroke(points, colorWithAlpha(index % 4 === 0 ? page.theme.accent : page.theme.accent2, 0.09 + index * 0.006));
          }
          return;
        }

        if (page.id === "red-form") {
          const spacing = compact ? 68 : 92;
          for (let x = -height; x < width + height; x += spacing) stroke([[x, height], [x + height, 0]], colorWithAlpha(page.theme.ink, 0.11), 1);
          for (let index = 0; index < 7; index += 1) {
            const x = ((seed * 13 + index * 149) % 1000) / 1000 * width;
            const y = ((seed * 7 + index * 223) % 1000) / 1000 * height;
            form.fillOnly(colorWithAlpha(index % 2 ? page.theme.accent2 : page.theme.accent, 0.55)).point(new Pt(x, y), 3 + index % 3, "square");
          }
          return;
        }

        if (page.id === "orbital-grid" || page.id === "gallery") {
          const rings = page.id === "gallery" ? 7 : 10;
          for (let ring = 0; ring < rings; ring += 1) {
            const points = [];
            const segments = compact ? 32 : 56;
            const radiusX = width * (0.12 + ring * 0.045);
            const radiusY = height * (0.06 + ring * 0.027);
            const phase = time * 0.00008 * (ring % 2 ? 1 : -1);
            for (let step = 0; step <= segments; step += 1) {
              const angle = step / segments * Math.PI * 2 + phase;
              points.push([center.x + Math.cos(angle) * radiusX, center.y + Math.sin(angle) * radiusY]);
            }
            stroke(points, colorWithAlpha(ring % 3 ? page.theme.accent2 : page.theme.accent, 0.08 + ring * 0.009));
          }
          form.fillOnly(colorWithAlpha(page.theme.accent, 0.62)).point(center, 3 + Math.sin(time * 0.001) * 1.2, "circle");
          return;
        }

        if (page.id === "corner-goods") {
          stroke([[width * 0.04, height * 0.78], [width * 0.96, height * 0.78]], colorWithAlpha(page.theme.ink, 0.16), 2);
          for (let index = 0; index < count + 4; index += 1) {
            const x = ((seed * 17 + index * 83) % 997) / 997 * width;
            const base = ((seed * 29 + index * 131) % 991) / 991 * height;
            const y = (base + time * (0.003 + index % 3 * 0.0015)) % height;
            form.fillOnly(colorWithAlpha(index % 4 === 0 ? page.theme.accent : page.theme.ink, 0.12 + index % 3 * 0.04)).point(new Pt(x, height - y), 1.5 + index % 3, "circle");
          }
          return;
        }

        if (page.id === "still-day") {
          for (let ring = 0; ring < count; ring += 1) {
            const points = [];
            const segments = compact ? 28 : 48;
            const radius = Math.min(width, height) * (0.07 + ring * 0.035) * (1 + Math.sin(time * 0.00032 + ring) * 0.02);
            for (let step = 0; step <= segments; step += 1) {
              const angle = step / segments * Math.PI * 2;
              points.push([center.x + Math.cos(angle) * radius * 1.4, center.y + Math.sin(angle) * radius]);
            }
            stroke(points, colorWithAlpha(ring % 3 === 0 ? page.theme.accent2 : page.theme.accent, 0.055 + ring * 0.004));
          }
          return;
        }

        if (page.id === "atelier-noir") {
          for (let index = 0; index < count; index += 1) {
            const points = [];
            const segments = compact ? 18 : 32;
            for (let step = 0; step <= segments; step += 1) {
              const progress = step / segments;
              points.push([progress * width, height * (0.18 + index * 0.04) + Math.sin(progress * Math.PI * 2 + index * 0.38 + time * 0.00016) * (18 + index * 1.8)]);
            }
            stroke(points, colorWithAlpha(index % 5 === 0 ? page.theme.accent : page.theme.ink, 0.07 + index * 0.005));
          }
          return;
        }

        if (page.id === "neon-rift") {
          for (let index = 0; index < count + 6; index += 1) {
            const angle = index / (count + 6) * Math.PI * 2 + time * 0.00012;
            const radius = Math.min(width, height) * (0.24 + (index % 5) * 0.035);
            const endpoint = [center.x + Math.cos(angle) * radius, center.y + Math.sin(angle) * radius];
            stroke([[center.x, center.y], endpoint], colorWithAlpha(index % 2 ? page.theme.accent : page.theme.accent2, 0.12 + index % 4 * 0.025));
            form.fillOnly(colorWithAlpha(index % 2 ? page.theme.accent2 : page.theme.accent, 0.52)).point(new Pt(endpoint[0], endpoint[1]), 1.5 + index % 3, "circle");
          }
          return;
        }

        if (page.id === "shanshui-now") {
          for (let layer = 0; layer < count; layer += 1) {
            const points = [];
            const segments = compact ? 18 : 38;
            for (let step = 0; step <= segments; step += 1) {
              const progress = step / segments;
              const ridge = Math.abs(Math.sin(progress * (2.4 + layer * 0.07) + layer * 0.7)) * height * (0.08 + layer * 0.006);
              points.push([progress * width, height * (0.62 + layer * 0.02) - ridge + Math.sin(time * 0.00008 + layer) * 3]);
            }
            stroke(points, colorWithAlpha(layer % 4 === 0 ? page.theme.accent : page.theme.ink, 0.055 + layer * 0.006));
          }
          return;
        }

        const columns = compact ? 8 : 12;
        const rows = compact ? 8 : 10;
        for (let column = 0; column <= columns; column += 1) stroke([[column / columns * width, 0], [column / columns * width, height]], colorWithAlpha(column % 4 === 0 ? page.theme.accent2 : page.theme.ink, 0.09));
        for (let row = 0; row <= rows; row += 1) stroke([[0, row / rows * height], [width, row / rows * height]], colorWithAlpha(row % 3 === 0 ? page.theme.accent : page.theme.ink, 0.09));
      }
    });

    if (activeRef.current) space.play();
    return () => {
      spaceRef.current = null;
      space.dispose();
    };
  }, [page]);

  return <div ref={hostRef} className="pts-host" />;
}
