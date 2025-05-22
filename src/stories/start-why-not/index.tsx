import type { Sequence } from "../../core/sequence";
import type { SequenceFactory } from "../../core/sequence-factory";

export const StoryId = 'start-why-not' as const;

export default function StartWhyNot(sf: SequenceFactory): Sequence {
  return sf.create(StoryId, (df, se) => {
    return [
      df.message('Question', 'Are you sure?'),
      df.message('Question', 'Are you really sure?'),
    ];
  });
}