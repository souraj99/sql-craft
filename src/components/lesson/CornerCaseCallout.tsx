type CornerCaseCalloutProps = {
  text: string;
};

export function CornerCaseCallout({ text }: CornerCaseCalloutProps) {
  return (
    <div className="corner-case-callout" role="note">
      <strong>⚠️ Corner case:</strong>
      <p>{text}</p>
    </div>
  );
}
