/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useReducer, type Dispatch, type ReactNode } from 'react';
import { curriculum } from '../data/curriculum';

type ThemeMode = 'dark' | 'light';

type QueryHistoryItem = {
  id: string;
  query: string;
  timestamp: number;
};

type AppState = {
  activeLessonId: string;
  completedLessons: Set<string>;
  theme: ThemeMode;
  playgroundQuery: string;
  queryHistory: QueryHistoryItem[];
};

type AppAction =
  | { type: 'SET_ACTIVE_LESSON'; payload: string }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_PLAYGROUND_QUERY'; payload: string }
  | { type: 'MARK_COMPLETE'; payload: string }
  | { type: 'ADD_HISTORY'; payload: { query: string; timestamp: number } };

type AppContextValue = AppState & { dispatch: Dispatch<AppAction> };

const firstLesson = curriculum[0]?.id ?? '';

const initialState: AppState = {
  activeLessonId: firstLesson,
  completedLessons: new Set<string>(),
  theme: 'dark',
  playgroundQuery: curriculum[0]?.exampleQuery ?? 'SELECT 1;',
  queryHistory: [],
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_ACTIVE_LESSON':
      return { ...state, activeLessonId: action.payload };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };
    case 'SET_PLAYGROUND_QUERY':
      return { ...state, playgroundQuery: action.payload };
    case 'MARK_COMPLETE': {
      const next = new Set(state.completedLessons);
      next.add(action.payload);
      return { ...state, completedLessons: next };
    }
    case 'ADD_HISTORY': {
      const id = `${action.payload.timestamp}-${Math.random().toString(36).slice(2, 7)}`;
      const next = [{ id, ...action.payload }, ...state.queryHistory].slice(0, 10);
      return { ...state, queryHistory: next };
    }
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = useMemo(() => ({ ...state, dispatch }), [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
