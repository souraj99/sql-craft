import type { Lesson } from '../../data/curriculum';
import { CornerCaseCallout } from './CornerCaseCallout';

type LessonPanelProps = {
  lesson: Lesson;
  visualization: React.ReactNode;
  onTryInPlayground: (query: string) => void;
};

const renderRichText = (text: string) =>
  text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code>$1</code>');

export function LessonPanel({ lesson, visualization, onTryInPlayground }: LessonPanelProps) {
  return (
    <article className="lesson-panel">
      <header>
        <p className="module-name">{lesson.module}</p>
        <h1>{lesson.title}</h1>
      </header>

      <section
        className="lesson-explanation"
        dangerouslySetInnerHTML={{ __html: renderRichText(lesson.explanation) }}
      />

      <section className="lesson-visualization">{visualization}</section>

      <section className="lesson-use-cases">
        <h2>Use cases</h2>
        <ul>
          {lesson.useCases.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="lesson-corner-cases">
        <h2>Watch-outs</h2>
        {lesson.cornerCases.map((item) => (
          <CornerCaseCallout key={item} text={item} />
        ))}
      </section>

      <button type="button" className="try-btn" onClick={() => onTryInPlayground(lesson.exampleQuery)}>
        Try in Playground
      </button>
    </article>
  );
}
