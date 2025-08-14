import { DialogProgress } from "../../components/story-components/dialog-progress";
import { SURVEY } from "../../constants/decision-type";
import { LinearTimedSequencePart } from "../../core/linear-timed-sequence-part";
import type { Sequence } from "../../core/sequence";
import type { SequenceFactory } from "../../core/sequence-factory";
import { StaticTimedSequencePart } from "../../core/static-timed-sequence-part";
import { TimedSequence } from "../../core/timed-sequence";
import { StoryId as ColorSurveyStoryId } from "../color-survey";
import { StoryId as StartWhyNotStoryId } from "../start-why-not";

const StartId = 'start' as const;
export const StoryId = StartId;

const paused = StaticTimedSequencePart.create;
const linear = LinearTimedSequencePart.create;

const startProgress = new TimedSequence(0, [
  paused(1000, 0),
  linear(500, 30),
  linear(1500, 40),
  linear(2000, 50),
  linear(4000, 60),
  // Less than a second -- 9
  paused(1000, 60),
  linear(100, 62),
  paused(2900, 62),
  linear(200, 63),
  paused(1800, 63),
  // Counting up -- 15
  linear(10000, 80),
  // Hang on -- 25
  paused(3500, 80),
  linear(500, 30),
  paused(3000, 30),
  linear(5000, 40),
  paused(1000, 40),
  linear(2000, 50),
  paused(1000, 50),
  linear(3000, 75),
  paused(2000, 75)
]);
const startLabel = new TimedSequence('Loading...', [
  paused(1000, 'Loading...'),
  paused(1000, '5 seconds remaining...'),
  paused(1000, '4 seconds remaining...'),
  paused(1000, '3 seconds remaining...'),
  paused(2000, '2 seconds remaining...'),
  paused(3000, '1 seconds remaining...'),
  paused(8000, 'Less than a second...'),
  paused(2000, '10 seconds remaining...'),
  paused(1000, '11 seconds remaining...'),
  paused(1000, '12 seconds remaining...'),
  paused(1000, '13 seconds remaining...'),
  paused(1000, '14 seconds remaining...'),
  paused(1000, '15 seconds remaining...'),
  paused(3000, '16 seconds remaining...'),
  paused(3000, 'Hang on...'),
  paused(2000, 'We forgot something...'),
  paused(2000, 'Ok, we\'re good!'),
  paused(1000, '5 seconds remaining...'),
  paused(1000, '4 seconds remaining...'),
  paused(2000, '3 seconds remaining...'),
  paused(3000, '2 seconds remaining...'),
  paused(2000, '5 minutes remaining...'),
  paused(1000, '6 minutes remaining...'),
  paused(1000, '10 minutes remaining...'),
  paused(1000, '20 minutes remaining...'),
  paused(2000, '1 hour 15 minutes remaining...'),
  paused(1000, '{d} days {h} hours remaining...'),
]);
const errorsProgress = new TimedSequence(0, [
  linear(3000, 100),
]);
const errorsLabel = new TimedSequence('Loading...', [
  paused(1000, 'Loading errors...'),
]);
const excusesProgress = new TimedSequence(0, [
  linear(2000, 50),
  paused(500, 50),
  linear(1000, 75),
  linear(1000, 100),
]);
const excusesLabel = new TimedSequence('Adding marshmallows...', [
  paused(1000, 'Adding prizes...'),
  paused(1000, 'Configuring excuses...'),
  paused(200, 'Splitting hairs...'),
  paused(1300, 'General work...'),
  paused(1000, 'Scanning...'),
]);

export default function StartStories(sf: SequenceFactory): Sequence[] {
  return [
    sf.create(StartId, (df, se, cf) => {
      return [
        df.cancel(StartWhyNotStoryId),
        df.custom('Loading', cf.component(DialogProgress, { progressSequence: startProgress, labelSequence: startLabel }), () => {}),
        df.message('Oops', 'We could not load the content.'),
        df.custom('Loading', cf.component(DialogProgress, { progressSequence: errorsProgress, labelSequence: errorsLabel }), () => {}),
        df.custom('Loading', cf.component(DialogProgress, { progressSequence: excusesProgress, labelSequence: excusesLabel }), () => {}),
        df.dialogWithSideEffect('Survey', 'How about answering some questions while you wait?', se.saveTo(SURVEY), 'Yes', 'No', undefined, undefined, ColorSurveyStoryId),
      ];
    }),
  ];
}