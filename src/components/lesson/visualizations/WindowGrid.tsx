import { useState } from 'react';

const rows = [
  { dept: 'Sales', name: 'Ava', value: 100 },
  { dept: 'Sales', name: 'Ben', value: 140 },
  { dept: 'Sales', name: 'Cara', value: 120 },
  { dept: 'Ops', name: 'Dan', value: 90 },
  { dept: 'Ops', name: 'Eli', value: 110 },
];

export function WindowGrid() {
  const [activeRow, setActiveRow] = useState(0);

  return (
    <div className="viz-card">
      <table className="window-grid">
        <thead>
          <tr>
            <th>Dept</th>
            <th>Name</th>
            <th>Value</th>
            <th>LAG</th>
            <th>LEAD</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const prev = rows[idx - 1]?.value ?? null;
            const next = rows[idx + 1]?.value ?? null;
            const inSamePartitionPrev = idx > 0 && rows[idx - 1]?.dept === row.dept;
            const inSamePartitionNext = idx < rows.length - 1 && rows[idx + 1]?.dept === row.dept;
            return (
              <tr key={`${row.name}-${idx}`} className={activeRow === idx ? 'frame-active' : ''}>
                <td className={!inSamePartitionPrev ? 'partition-start' : ''}>{row.dept}</td>
                <td>{row.name}</td>
                <td>{row.value}</td>
                <td>{inSamePartitionPrev ? prev : 'NULL'}</td>
                <td className={!inSamePartitionNext ? 'partition-end' : ''}>{inSamePartitionNext ? next : 'NULL'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="viz-controls">
        <button type="button" onClick={() => setActiveRow((v) => Math.max(v - 1, 0))}>Prev</button>
        <span>Row {activeRow + 1} of {rows.length}</span>
        <button type="button" onClick={() => setActiveRow((v) => Math.min(v + 1, rows.length - 1))}>Next</button>
      </div>
    </div>
  );
}
