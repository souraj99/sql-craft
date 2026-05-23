import { useState } from 'react';

export function NormalizationSplit() {
  const [split, setSplit] = useState(false);

  return (
    <div className="viz-card">
      <div className="split-wrap">
        <div className={`split-table ${split ? 'split' : ''}`}>
          <h4>Customers + Orders</h4>
          <span>Alice | 320</span>
          <span>Alice | 120</span>
          <span>Bob | 80</span>
        </div>
        <div className={`split-table ${split ? 'split' : ''}`}>
          <h4>Customers</h4>
          <span>Alice</span>
          <span>Bob</span>
        </div>
        <div className={`split-table ${split ? 'split' : ''}`}>
          <h4>Orders</h4>
          <span>Alice, 320</span>
          <span>Bob, 80</span>
        </div>
      </div>
      <div className="viz-controls">
        <button type="button" onClick={() => setSplit((v) => !v)}>{split ? 'Merge view' : 'Split to 3NF'}</button>
      </div>
    </div>
  );
}
