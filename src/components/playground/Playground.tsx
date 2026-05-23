import { Play } from 'lucide-react';
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useSqlJs, type QueryResult } from '../../hooks/useSqlJs';
import { ResultsTable } from './ResultsTable';
import { SchemaInspector } from './SchemaInspector';
import { SqlEditor } from './SqlEditor';
import { QueryHistory } from './QueryHistory';

type PlaygroundProps = {
  onSuccessfulRun: () => void;
};

export function Playground({ onSuccessfulRun }: PlaygroundProps) {
  const { theme, playgroundQuery, dispatch, queryHistory, activeLessonId } = useAppContext();
  const { isReady, loadingError, runQuery } = useSqlJs();
  const [result, setResult] = useState<QueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const setPlaygroundSql = (value: string) => {
    dispatch({ type: 'SET_PLAYGROUND_QUERY', payload: value });
  };

  const execute = async () => {
    try {
      const output = await runQuery(playgroundQuery);
      setResult(output);
      setError(null);
      dispatch({ type: 'MARK_COMPLETE', payload: activeLessonId });
      onSuccessfulRun();
      dispatch({ type: 'ADD_HISTORY', payload: { query: playgroundQuery, timestamp: Date.now() } });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <section className="playground-panel">
      <div className="playground-head">
        <h2>Playground</h2>
        <button type="button" onClick={() => void execute()} disabled={!isReady || !playgroundQuery.trim()}>
          <Play size={14} /> Run (Ctrl+Enter)
        </button>
      </div>
      {loadingError && <div className="result-error"><p>{loadingError}</p></div>}
      <SqlEditor
        value={playgroundQuery}
        theme={theme}
        onChange={setPlaygroundSql}
        onRun={() => void execute()}
      />
      <ResultsTable result={result} error={error} />
      {isReady && <SchemaInspector runQuery={runQuery} onInsertQuery={setPlaygroundSql} />}
      <QueryHistory items={queryHistory} onPick={setPlaygroundSql} />
    </section>
  );
}
