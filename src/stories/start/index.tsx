import { DialogTitle } from "../../components/dialog-title";
import type { Sequence } from "../../core/sequence";
import type { SequenceFactory } from "../../core/sequence-factory";

export const StoryId = 'start' as const;

export default function StartStories(sf: SequenceFactory): Sequence {
  return sf.create(StoryId, (df) => {
    return [
      df.message('Oops', 'We could not load the content.'),
      df.message('One more thing...', () => <DialogTitle>You're a winner!</DialogTitle>),
    ];
  });
}