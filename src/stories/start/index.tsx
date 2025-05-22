import type { Sequence } from "../../core/sequence";
import type { SequenceFactory } from "../../core/sequence-factory";

export const StoryId = 'start' as const;

export default function StartStories(sf: SequenceFactory): Sequence {
  return sf.create(StoryId, (df, se) => {
    return [
      df.message('Oops', 'We could not load the content.'),
    ];
  });
}