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
  const { theme, playgroundQuery, dispatch, queryHistory } = useAppContext();
  const { isReady, loadingError, runQuery } = useSqlJs();
  const [query, setQuery] = useState(playgroundQuery);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const execute = async () => {
    try {
      const output = await runQuery(query);
      setResult(output);
      setError(null);
      dispatch({ type: 'MARK_COMPLETE', payload: '' });
      onSuccessfulRun();
      dispatch({ type: 'ADD_HISTORY', payload: { query, timestamp: Date.now() } });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <section className="playground-panel">
      <div className="playground-head">
        <h2>Playground</h2>
        <button type="button" onClick={() => void execute()} disabled={!isReady}>
          <Play size={14} /> Run (Ctrl+Enter)
        </button>
      </div>
      {loadingError && <div className="result-error"><p>{loadingError}</p></div>}
      <SqlEditor
        value={query}
        theme={theme}
        onChange={(value) => {
          setQuery(value);
          dispatch({ type: 'SET_PLAYGROUND_QUERY', payload: value });
        }}
        onRun={() => void execute()}
      />
      <ResultsTable result={result} error={error} />
      {isReady && <SchemaInspector runQuery={runQuery} onInsertQuery={(sql) => setQuery(sql)} />}
      <QueryHistory items={queryHistory} onPick={(sql) => setQuery(sql)} dispatch={dispatch as never} />
    </section>
  );
}
