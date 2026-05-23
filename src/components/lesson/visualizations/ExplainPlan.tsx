const nodes = [
  { id: '1', label: 'HASH JOIN', cost: 8.2, rows: 120, tone: 'hash' },
  { id: '2', label: 'SEQ SCAN orders', cost: 4.1, rows: 400, tone: 'seq' },
  { id: '3', label: 'INDEX SCAN customers', cost: 1.8, rows: 80, tone: 'idx' },
];

export function ExplainPlan() {
  return (
    <div className="viz-card">
      <svg viewBox="0 0 280 180" className="viz-svg">
        <line x1="140" y1="56" x2="70" y2="98" stroke="var(--border)" />
        <line x1="140" y1="56" x2="210" y2="98" stroke="var(--border)" />
        {nodes.map((node, i) => {
          const x = i === 0 ? 95 : i === 1 ? 18 : 162;
          const y = i === 0 ? 24 : 104;
          return (
            <g key={node.id}>
              <rect x={x} y={y} width="102" height="46" rx="8" className={`plan-${node.tone}`} />
              <text x={x + 8} y={y + 18} fontSize="10" fill="var(--text)">{node.label}</text>
              <text x={x + 8} y={y + 32} fontSize="9" fill="var(--text-muted)">cost:{node.cost} rows:{node.rows}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
