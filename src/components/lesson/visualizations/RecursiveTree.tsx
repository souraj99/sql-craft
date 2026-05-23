import { useState } from 'react';

const nodes = [
  { id: 1, label: 'CEO', x: 140, y: 20, level: 0 },
  { id: 2, label: 'VP Sales', x: 70, y: 80, level: 1 },
  { id: 3, label: 'VP Eng', x: 210, y: 80, level: 1 },
  { id: 4, label: 'Rep', x: 40, y: 140, level: 2 },
  { id: 5, label: 'Engineer', x: 240, y: 140, level: 2 },
];

const edges = [[1, 2], [1, 3], [2, 4], [3, 5]];

export function RecursiveTree() {
  const [level, setLevel] = useState(0);

  return (
    <div className="viz-card">
      <svg viewBox="0 0 280 180" className="viz-svg">
        {edges.map(([a, b]) => {
          const from = nodes.find((n) => n.id === a)!;
          const to = nodes.find((n) => n.id === b)!;
          const visible = Math.max(from.level, to.level) <= level;
          return <line key={`${a}-${b}`} x1={from.x} y1={from.y + 12} x2={to.x} y2={to.y - 12} stroke="var(--border)" opacity={visible ? 1 : 0} />;
        })}
        {nodes.map((node) => (
          <g key={node.id} className={`tree-node ${node.level <= level ? 'show' : ''}`}>
            <circle cx={node.x} cy={node.y} r="14" fill="var(--surface-2)" stroke="var(--primary)" />
            <text x={node.x} y={node.y + 30} textAnchor="middle" fill="var(--text)" fontSize="10">{node.label}</text>
          </g>
        ))}
      </svg>
      <div className="viz-controls">
        <button type="button" onClick={() => setLevel((v) => Math.max(v - 1, 0))}>Back</button>
        <button type="button" onClick={() => setLevel((v) => Math.min(v + 1, 2))}>Step through</button>
      </div>
    </div>
  );
}
