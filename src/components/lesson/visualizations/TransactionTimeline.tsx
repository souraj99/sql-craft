import { useState } from 'react';

const events = ['BEGIN', 'Read', 'Write', 'Validate', 'COMMIT'];

export function TransactionTimeline() {
  const [step, setStep] = useState(0);

  return (
    <div className="viz-card">
      <div className="timeline">
        {events.map((event, idx) => (
          <div key={event} className={`timeline-step ${idx <= step ? 'active' : ''}`}>
            <span>{event}</span>
          </div>
        ))}
      </div>
      <div className="viz-controls">
        <button type="button" onClick={() => setStep((v) => Math.max(v - 1, 0))}>Rollback</button>
        <button type="button" onClick={() => setStep((v) => Math.min(v + 1, events.length - 1))}>Commit step</button>
      </div>
    </div>
  );
}
