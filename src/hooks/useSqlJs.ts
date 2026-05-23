import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import initSqlJs, { type Database, type QueryExecResult } from 'sql.js';
import { seedSql } from '../data/seedData';

export type SqlRow = (string | number | null)[];
export type QueryResult = {
  columns: string[];
  rows: SqlRow[];
  rowCount: number;
  elapsedMs: number;
};

type SqlState = {
  db: Database | null;
  isReady: boolean;
  loadingError: string | null;
};

const splitStatements = (sql: string) =>
  sql
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean);

const resultFromExec = (items: QueryExecResult[], elapsedMs: number): QueryResult => {
  const last = items[items.length - 1];
  if (!last) {
    return { columns: ['status'], rows: [['Query executed']], rowCount: 0, elapsedMs };
  }

  return {
    columns: last.columns,
    rows: last.values as SqlRow[],
    rowCount: last.values.length,
    elapsedMs,
  };
};

export function useSqlJs() {
  const [state, setState] = useState<SqlState>({ db: null, isReady: false, loadingError: null });
  const dbRef = useRef<Database | null>(null);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const SQL = await initSqlJs({
          locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/${file}`,
        });
        const db = new SQL.Database();
        db.exec(seedSql);
        dbRef.current = db;

        if (mounted) {
          setState({ db, isReady: true, loadingError: null });
        }
      } catch (error) {
        if (mounted) {
          setState({ db: null, isReady: false, loadingError: (error as Error).message });
        }
      }
    };

    void init();

    return () => {
      mounted = false;
      dbRef.current?.close();
    };
  }, []);

  const runQuery = useCallback(
    async (query: string): Promise<QueryResult> => {
      if (!state.db) {
        throw new Error('Database not initialized yet.');
      }

      const start = performance.now();
      const statements = splitStatements(query);
      if (statements.length === 0) {
        throw new Error('Please enter a SQL query.');
      }

      let finalResults: QueryExecResult[] = [];

      for (const statement of statements) {
        finalResults = state.db.exec(statement);
      }

      const elapsedMs = Number((performance.now() - start).toFixed(2));
      return resultFromExec(finalResults, elapsedMs);
    },
    [state.db],
  );

  return useMemo(
    () => ({
      db: state.db,
      isReady: state.isReady,
      loadingError: state.loadingError,
      runQuery,
    }),
    [runQuery, state.db, state.isReady, state.loadingError],
  );
}
