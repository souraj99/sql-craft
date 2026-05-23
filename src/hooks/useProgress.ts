import { useAppContext } from '../context/AppContext';

export function useProgress(totalLessons: number) {
  const { completedLessons, dispatch, activeLessonId } = useAppContext();

  const completedCount = completedLessons.size;
  const progressRatio = totalLessons === 0 ? 0 : completedCount / totalLessons;

  const markComplete = (lessonId = activeLessonId) => {
    dispatch({ type: 'MARK_COMPLETE', payload: lessonId });
  };

  return { completedLessons, completedCount, progressRatio, markComplete };
}
