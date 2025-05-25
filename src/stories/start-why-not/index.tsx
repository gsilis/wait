import type { Sequence } from "../../core/sequence";
import type { SequenceFactory } from "../../core/sequence-factory";
import { StoryId as ColorSurveyStoryId } from "../color-survey";

export const StoryId = 'start-why-not' as const;
const ChangeMindStoryId = 'start-why-not-change-mind' as const;
const SureStoryId = 'start-why-not-be-sure' as const;

export default function StartWhyNot(sf: SequenceFactory): Sequence[] {
  return [
    sf.create(StoryId, (df) => {
      return [
        df.cancel(ColorSurveyStoryId),
        df.dialog('Question', 'Are you sure?', 'Yes', 'No'),
        df.dialog('Question', 'Are you really sure?', 'Yes', 'No'),
        df.dialog('Double Check', 'Are you really, really sure?', 'Yes', 'No'),
        df.dialog('Triple Check', 'Are you really, really, really sure?', 'Yes', 'No'),
        df.message('Take a Break', `We really don't want to pester you`),
        df.message('Take another Break', `But, we can keep going`),
        df.message('Simple Survey', `It's just a simple survey. Totally anonymous.`),
        df.message('Try Again', `Ok, let's try this again.`),
        df.cancel(ChangeMindStoryId),
        df.dialog('Check x 4', 'Are you really, really, really, really sure?', 'Yes', 'No'),
        df.message('Hang On', 'We talked about this...'),
        df.message('Hang On', `It's really just a simple survey. Really!`),
        df.message('Hang On', `Let's try one more time.`),
        df.cancel(SureStoryId),
        df.dialog('Check x 5', `Are you super-mega-totally sure?`, 'Yes!', `I'm no longer sure`),
        df.message('About That', `Ok, we lied, we're possibly going to ask you several more times.`),
        df.message('About That', `We're not going to use this information for anything bad.`),
        df.cancel(ChangeMindStoryId),
        df.dialog('Check x 6', `Are you really very sure you don't want to help us out?`, `I'm Sure`, `Ok, Why Not`),
      ];
    }),

    sf.create(SureStoryId, (df) => {
      return [
        df.message(`It's Confusing`, `Sorry about the confusion. We're sure you're going to enjoy this.`),
        df.message(`Start Survey`, `Let's load the survey`, 'Ok', `We're sure you'll be sure`, ColorSurveyStoryId),
      ];
    }),

    sf.create(ChangeMindStoryId, (df) => {
      return [
        df.message('Great!', `We're glad you changed your mind!`),
        df.message('Start Survey', `Let's start this survey...`, 'Ok', `You'll love it`, ColorSurveyStoryId),
      ];
    }),
  ];
}