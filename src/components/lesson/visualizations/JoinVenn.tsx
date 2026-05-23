import { useMemo, useState } from 'react';

type JoinType = 'inner' | 'left' | 'right' | 'full' | 'cross';

const joinTypes: JoinType[] = ['inner', 'left', 'right', 'full', 'cross'];

export function JoinVenn({ joinType: controlled }: { joinType?: JoinType }) {
  const [joinType, setJoinType] = useState<JoinType>(controlled ?? 'inner');
  const active = controlled ?? joinType;

  const style = useMemo(() => {
    switch (active) {
      case 'inner':
        return { left: 96, width: 48, opacity: 1 };
      case 'left':
        return { left: 60, width: 84, opacity: 1 };
      case 'right':
        return { left: 96, width: 84, opacity: 1 };
      case 'full':
        return { left: 60, width: 120, opacity: 1 };
      case 'cross':
        return { left: 40, width: 160, opacity: 0.55 };
      default:
        return { left: 96, width: 48, opacity: 1 };
    }
  }, [active]);

  return (
    <div className="viz-card">
      <svg viewBox="0 0 240 150" className="viz-svg">
        <circle cx="96" cy="75" r="52" fill="var(--primary)" fillOpacity="0.35" stroke="var(--primary)" strokeWidth="2" />
        <circle cx="144" cy="75" r="52" fill="var(--accent-amber)" fillOpacity="0.35" stroke="var(--accent-amber)" strokeWidth="2" />
        <rect y="24" x={style.left} width={style.width} height="102" rx="44" fill="var(--success)" fillOpacity={style.opacity} className="join-highlight" />
        <text x="80" y="28" textAnchor="middle" fill="var(--text)">A</text>
        <text x="160" y="28" textAnchor="middle" fill="var(--text)">B</text>
      </svg>
      <div className="viz-controls">
        {joinTypes.map((type) => (
          <button key={type} type="button" className={active === type ? 'active' : ''} onClick={() => setJoinType(type)}>
            {type.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
