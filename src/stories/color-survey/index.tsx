import type { Sequence } from "../../core/sequence";
import type { SequenceFactory } from "../../core/sequence-factory";

export const StoryId = 'color-survey' as const;

export default function ColorSurvey(sf: SequenceFactory): Sequence {
  return sf.create(StoryId, (df, se) => {
    return [
      df.message('Survey', 'Cool, thanks!'),
    ];
  });
}