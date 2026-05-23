import { useState } from 'react';

export function IndexScan() {
  const [running, setRunning] = useState(false);

  return (
    <div className="viz-card">
      <div className="scan-grid">
        <div>
          <h4>Full scan</h4>
          <div className={`scan-list ${running ? 'running' : ''}`}>
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} style={{ animationDelay: `${i * 0.12}s` }} />
            ))}
          </div>
        </div>
        <div>
          <h4>Index scan</h4>
          <svg viewBox="0 0 170 110" className="viz-svg compact">
            <circle cx="85" cy="20" r="12" className={running ? 'btree-hit' : ''} />
            <circle cx="45" cy="60" r="10" className={running ? 'btree-hit delayed-1' : ''} />
            <circle cx="125" cy="60" r="10" className={running ? 'btree-hit delayed-2' : ''} />
            <line x1="85" y1="30" x2="45" y2="50" />
            <line x1="85" y1="30" x2="125" y2="50" />
          </svg>
        </div>
      </div>
      <div className="viz-controls">
        <button
          type="button"
          onClick={() => {
            setRunning(false);
            requestAnimationFrame(() => setRunning(true));
          }}
        >
          Run
        </button>
      </div>
    </div>
  );
}
