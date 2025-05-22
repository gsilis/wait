import type { Sequence } from "../../core/sequence";
import type { SequenceFactory } from "../../core/sequence-factory";

export const StoryId = 'color-survey-change-mind' as const;

export default function ColorSurveyChangeMind(sf: SequenceFactory): Sequence[] {
  return [
    sf.create(StoryId, (df, se) => {
      return [
        df.message('Confused', 'You changed your mind!', 'Yes'),
      ];
    }),
  ];
}