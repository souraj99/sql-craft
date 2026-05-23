import { useMemo, useState } from 'react';
import type { QueryResult } from '../../hooks/useSqlJs';

type ResultsTableProps = {
  result: QueryResult | null;
  error: string | null;
};

const PAGE_SIZE = 20;

export function ResultsTable({ result, error }: ResultsTableProps) {
  const [page, setPage] = useState(1);

  const paginatedRows = useMemo(() => {
    if (!result) return [];
    const start = (page - 1) * PAGE_SIZE;
    return result.rows.slice(start, start + PAGE_SIZE);
  }, [page, result]);

  const maxPage = result ? Math.max(1, Math.ceil(result.rows.length / PAGE_SIZE)) : 1;

  if (error) {
    return (
      <div className="result-error">
        <strong>Query error</strong>
        <p>{error}</p>
        <small>Hint: verify table/column names and SQL syntax.</small>
      </div>
    );
  }

  if (!result) {
    return <div className="result-empty">Run a query to see results.</div>;
  }

  return (
    <div className="results-wrap">
      <div className="result-meta">{result.rowCount} rows in {result.elapsedMs}ms</div>
      <div className="results-table-wrap">
        <table>
          <thead>
            <tr>
              {result.columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>
                    {cell === null ? <span className="null-pill">NULL</span> : String(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pager">
        <button type="button" disabled={page <= 1} onClick={() => setPage((v) => v - 1)}>Prev</button>
        <span>{page}/{maxPage}</span>
        <button type="button" disabled={page >= maxPage} onClick={() => setPage((v) => v + 1)}>Next</button>
      </div>
    </div>
  );
}
