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
    const lines = window.innerWidth < 620 ? 9 : 16;
    const nodes = Array.from({ length: lines }, (_, index) => ({
      phase: (index / lines) * Math.PI * 2 + seed * 0.01,
      speed: 0.00012 + (index % 4) * 0.000025,
      depth: 0.14 + (index % 5) * 0.045
    }));

    space.add({
      animate: time => {
        if (!activeRef.current) return;
        const size = space.size;
        const center = new Pt(size.x * 0.5, size.y * 0.5);
        space.clear();

        nodes.forEach((node, index) => {
          const points = new Group();
          const segments = window.innerWidth < 620 ? 10 : 18;
          for (let segment = 0; segment <= segments; segment += 1) {
            const progress = segment / segments;
            const wave = Math.sin(node.phase + progress * 7 + time * node.speed);
            const second = Math.cos(node.phase * 0.7 + progress * 4 - time * node.speed * 0.65);
            const x = size.x * (0.04 + progress * 0.92);
            const y = center.y + wave * size.y * node.depth + second * 18 + (index - lines / 2) * 2.4;
            points.push(new Pt(x, y));
          }
          const alpha = 0.11 + (index % 4) * 0.025;
          form.strokeOnly(colorWithAlpha(index % 3 === 0 ? page.theme.accent2 : page.theme.accent, alpha), 1).line(points);
        });

        const pulse = 4 + (Math.sin(time * 0.001) + 1) * 2;
        form.fillOnly(colorWithAlpha(page.theme.accent, 0.6)).point(center, pulse, "circle");
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
