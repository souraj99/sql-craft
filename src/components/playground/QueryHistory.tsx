import type { Dispatch } from 'react';

type QueryHistoryItem = {
  id: string;
  query: string;
  timestamp: number;
};

type QueryHistoryProps = {
  items: QueryHistoryItem[];
  onPick: (query: string) => void;
  dispatch: Dispatch<{ type: 'SET_PLAYGROUND_QUERY'; payload: string }>;
};

const trimQuery = (query: string) => (query.length > 48 ? `${query.slice(0, 48)}...` : query);

export function QueryHistory({ items, onPick }: QueryHistoryProps) {
  return (
    <div className="query-history">
      <h3>History</h3>
      <ul>
        {items.length === 0 && <li className="empty">No queries yet.</li>}
        {items.map((item) => (
          <li key={item.id}>
            <button type="button" onClick={() => onPick(item.query)}>
              <span>{trimQuery(item.query)}</span>
              <small>{new Date(item.timestamp).toLocaleTimeString()}</small>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
