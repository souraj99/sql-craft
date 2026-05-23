import { useEffect, useState } from 'react';
import type { QueryResult } from '../../hooks/useSqlJs';

type SchemaInspectorProps = {
  runQuery: (query: string) => Promise<QueryResult>;
  onInsertQuery: (query: string) => void;
};

type ColumnDef = { name: string; type: string };

export function SchemaInspector({ runQuery, onInsertQuery }: SchemaInspectorProps) {
  const [tables, setTables] = useState<string[]>([]);
  const [columns, setColumns] = useState<Record<string, ColumnDef[]>>({});
  const [openTable, setOpenTable] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const schema = await runQuery("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name;");
      setTables(schema.rows.map((row) => String(row[0])));
    };

    void load();
  }, [runQuery]);

  const toggleTable = async (tableName: string) => {
    setOpenTable((current) => (current === tableName ? null : tableName));
    if (columns[tableName]) return;

    const info = await runQuery(`PRAGMA table_info(${tableName});`);
    const defs = info.rows.map((row) => ({ name: String(row[1]), type: String(row[2]) }));
    setColumns((prev) => ({ ...prev, [tableName]: defs }));
  };

  return (
    <div className="schema-inspector">
      <h3>Schema</h3>
      <ul>
        {tables.map((table) => (
          <li key={table}>
            <button
              type="button"
              className="table-btn"
              onClick={() => {
                void toggleTable(table);
                onInsertQuery(`SELECT * FROM ${table} LIMIT 10;`);
              }}
            >
              {table}
            </button>
            {openTable === table && columns[table] && (
              <ul className="column-list">
                {columns[table].map((col) => (
                  <li key={`${table}-${col.name}`}>{col.name} <em>{col.type}</em></li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
