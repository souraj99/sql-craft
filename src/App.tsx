import { useMemo, useState } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { curriculum } from './data/curriculum';
import { useProgress } from './hooks/useProgress';
import { Layout } from './components/layout/Layout';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { LessonPanel } from './components/lesson/LessonPanel';
import { Playground } from './components/playground/Playground';
import { ExplainPlan } from './components/lesson/visualizations/ExplainPlan';
import { IndexScan } from './components/lesson/visualizations/IndexScan';
import { JoinVenn } from './components/lesson/visualizations/JoinVenn';
import { NormalizationSplit } from './components/lesson/visualizations/NormalizationSplit';
import { RecursiveTree } from './components/lesson/visualizations/RecursiveTree';
import { TransactionTimeline } from './components/lesson/visualizations/TransactionTimeline';
import { WindowGrid } from './components/lesson/visualizations/WindowGrid';

const visualizationMap = {
  JoinVenn: <JoinVenn />,
  WindowGrid: <WindowGrid />,
  RecursiveTree: <RecursiveTree />,
  IndexScan: <IndexScan />,
  ExplainPlan: <ExplainPlan />,
  NormalizationSplit: <NormalizationSplit />,
  TransactionTimeline: <TransactionTimeline />,
} as const;

function AppContent() {
  const { activeLessonId, completedLessons, dispatch, theme } = useAppContext();
  const [mobileTab, setMobileTab] = useState<'learn' | 'code'>('learn');
  const { completedCount, progressRatio, markComplete } = useProgress(curriculum.length);

  const activeLesson = useMemo(
    () => curriculum.find((lesson) => lesson.id === activeLessonId) ?? curriculum[0],
    [activeLessonId],
  );

  const visualization = visualizationMap[activeLesson.visualization as keyof typeof visualizationMap] ?? <WindowGrid />;

  return (
    <Layout
      mobileTab={mobileTab}
      onMobileTabChange={setMobileTab}
      topBar={
        <TopBar
          progressLabel={`${completedCount}/${curriculum.length}`}
          progressPercent={progressRatio}
          onThemeToggle={() => dispatch({ type: 'TOGGLE_THEME' })}
          theme={theme}
        />
      }
      sidebar={
        <Sidebar
          lessons={curriculum}
          activeLessonId={activeLessonId}
          completedLessons={completedLessons}
          onLessonSelect={(lessonId) => {
            const lesson = curriculum.find((item) => item.id === lessonId);
            dispatch({ type: 'SET_ACTIVE_LESSON', payload: lessonId });
            if (lesson) {
              dispatch({ type: 'SET_PLAYGROUND_QUERY', payload: lesson.exampleQuery });
            }
          }}
        />
      }
      lessonPanel={
        <LessonPanel
          lesson={activeLesson}
          visualization={visualization}
          onTryInPlayground={(query) => {
            dispatch({ type: 'SET_PLAYGROUND_QUERY', payload: query });
            setMobileTab('code');
          }}
        />
      }
      playground={<Playground onSuccessfulRun={() => markComplete(activeLessonId)} />}
    />
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
