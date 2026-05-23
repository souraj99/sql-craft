import { history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { sql } from '@codemirror/lang-sql';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { useEffect, useRef } from 'react';

type SqlEditorProps = {
  value: string;
  theme: 'dark' | 'light';
  onChange: (value: string) => void;
  onRun: () => void;
};

export function SqlEditor({ value, theme, onChange, onRun }: SqlEditorProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!hostRef.current) return;

    const editorTheme = EditorView.theme({
      '&': {
        fontFamily: 'var(--font-code)',
        fontSize: '13px',
        backgroundColor: theme === 'dark' ? 'var(--surface)' : '#ffffff',
        color: 'var(--text)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
      },
      '.cm-gutters': {
        backgroundColor: theme === 'dark' ? 'var(--surface-2)' : '#f6f8fa',
        color: 'var(--text-muted)',
        border: 'none',
      },
      '.cm-content': {
        minHeight: '220px',
      },
      '.cm-activeLine': {
        backgroundColor: 'rgba(46,168,160,0.15)',
      },
    });

    const state = EditorState.create({
      doc: value,
      extensions: [
        lineNumbers(),
        history(),
        sql(),
        keymap.of([
          ...defaultKeymap,
          ...historyKeymap,
          indentWithTab,
          {
            key: 'Mod-Enter',
            run: () => {
              onRun();
              return true;
            },
          },
        ]),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        }),
        editorTheme,
      ],
    });

    const view = new EditorView({ state, parent: hostRef.current });
    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [onChange, onRun, theme]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current === value) return;
    view.dispatch({ changes: { from: 0, to: current.length, insert: value } });
  }, [value]);

  return <div ref={hostRef} className="sql-editor" />;
}
