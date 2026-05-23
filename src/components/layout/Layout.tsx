import type { ReactNode } from 'react';
import './layout.css';

type LayoutProps = {
  topBar: ReactNode;
  sidebar: ReactNode;
  lessonPanel: ReactNode;
  playground: ReactNode;
  mobileTab: 'learn' | 'code';
  onMobileTabChange: (tab: 'learn' | 'code') => void;
};

export function Layout({ topBar, sidebar, lessonPanel, playground, mobileTab, onMobileTabChange }: LayoutProps) {
  return (
    <div className="app-shell">
      {topBar}
      <main className="app-main">
        <aside className="sidebar-pane">{sidebar}</aside>
        <section className={`lesson-pane ${mobileTab === 'learn' ? 'mobile-active' : ''}`}>{lessonPanel}</section>
        <section className={`playground-pane ${mobileTab === 'code' ? 'mobile-active' : ''}`}>{playground}</section>
      </main>
      <div className="mobile-tabs">
        <button
          className={mobileTab === 'learn' ? 'active' : ''}
          type="button"
          onClick={() => onMobileTabChange('learn')}
        >
          📖 Learn
        </button>
        <button
          className={mobileTab === 'code' ? 'active' : ''}
          type="button"
          onClick={() => onMobileTabChange('code')}
        >
          ▶ Code
        </button>
      </div>
    </div>
  );
}
