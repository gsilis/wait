import { SURVEY } from "../../constants/decision-type";
import type { Sequence } from "../../core/sequence";
import type { SequenceFactory } from "../../core/sequence-factory";
import { StoryId as ColorSurveyStoryId } from "../color-survey";
import { StoryId as StartWhyNotStoryId } from "../start-why-not";

export const StoryId = 'start' as const;

export default function StartStories(sf: SequenceFactory): Sequence {
  return sf.create(StoryId, (df, se) => {
    return [
      df.cancel(StartWhyNotStoryId),
      df.message('Oops', 'We could not load the content.'),
      df.dialogWithSideEffect('Survey', 'How about answering some questions while you wait?', se.saveTo(SURVEY), 'Yes', 'No', undefined, undefined, ColorSurveyStoryId),
    ];
  });
}