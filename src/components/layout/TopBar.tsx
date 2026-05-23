import { Moon, Search, Sun } from 'lucide-react';

type TopBarProps = {
  progressLabel: string;
  progressPercent: number;
  onThemeToggle: () => void;
  theme: 'dark' | 'light';
};

export function TopBar({ progressLabel, progressPercent, onThemeToggle, theme }: TopBarProps) {
  return (
    <header className="topbar">
      <div className="logo-wrap">
        <strong>SQL Craft</strong>
      </div>
      <label className="search-wrap" htmlFor="lesson-search">
        <Search size={14} />
        <input id="lesson-search" placeholder="Search lessons..." readOnly />
      </label>
      <div className="progress-wrap" aria-label="Learning progress">
        <span>{progressLabel}</span>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${Math.min(100, Math.max(0, progressPercent * 100))}%` }} />
        </div>
      </div>
      <button type="button" className="theme-btn" onClick={onThemeToggle} aria-label="Toggle theme">
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </header>
  );
}
