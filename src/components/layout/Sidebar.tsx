import { Check, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { Lesson } from '../../data/curriculum';
import { moduleOrder } from '../../data/curriculum';

type SidebarProps = {
  lessons: Lesson[];
  activeLessonId: string;
  completedLessons: Set<string>;
  onLessonSelect: (lessonId: string) => void;
};

export function Sidebar({ lessons, activeLessonId, completedLessons, onLessonSelect }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const byModule = useMemo(() => {
    const map = new Map<string, Lesson[]>();
    for (const moduleName of moduleOrder) map.set(moduleName, []);
    lessons.forEach((lesson) => {
      if (!map.has(lesson.module)) map.set(lesson.module, []);
      map.get(lesson.module)?.push(lesson);
    });
    return map;
  }, [lessons]);

  const content = (
    <>
      <div className="sidebar-header">
        <button type="button" className="icon-btn" onClick={() => setCollapsed((v) => !v)} aria-label="Toggle sidebar collapse">
          {collapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
        </button>
        {!collapsed && <h2>Curriculum</h2>}
      </div>
      {!collapsed && (
        <div className="sidebar-content">
          {Array.from(byModule.entries()).map(([moduleName, moduleLessons]) => (
            <section key={moduleName}>
              <h3>{moduleName}</h3>
              <ul>
                {moduleLessons.map((lesson) => {
                  const isActive = lesson.id === activeLessonId;
                  const isCompleted = completedLessons.has(lesson.id);
                  return (
                    <li key={lesson.id}>
                      <button
                        className={`lesson-link ${isActive ? 'active' : ''}`}
                        type="button"
                        onClick={() => {
                          onLessonSelect(lesson.id);
                          setIsDrawerOpen(false);
                        }}
                      >
                        <span>{lesson.title}</span>
                        {isCompleted && <Check size={14} className="complete-icon" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </>
  );

  return (
    <>
      <button className="mobile-menu-btn" type="button" onClick={() => setIsDrawerOpen(true)} aria-label="Open lesson menu">
        <Menu size={18} />
      </button>
      <div className="sidebar-desktop">{content}</div>
      {isDrawerOpen && (
        <div className="sidebar-drawer-backdrop">
          <div className="sidebar-drawer">
            <div className="drawer-top">
              <h2>Lessons</h2>
              <button type="button" className="icon-btn" onClick={() => setIsDrawerOpen(false)} aria-label="Close lesson menu">
                <X size={16} />
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
