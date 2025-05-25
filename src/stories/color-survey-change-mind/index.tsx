import { DialogPrimaryText } from "../../components/dialog-primary-text";
import { WaitToClick } from "../../components/story-components/wait-to-click";
import type { Sequence } from "../../core/sequence";
import type { SequenceFactory } from "../../core/sequence-factory";

export const StoryId = 'color-survey-change-mind' as const;
const YesYouDidStoryId = 'color-survey-no-i-did-not' as const;

export default function ColorSurveyChangeMind(sf: SequenceFactory): Sequence[] {
  return [
    sf.create(StoryId, (df) => {
      return [
        df.cancel(YesYouDidStoryId),
        df.dialog('Confused', 'You changed your mind!', 'Yes', 'No'),
        df.message('Tell Us Why', 'Can you tell us why?'),
      ];
    }),

    sf.create(YesYouDidStoryId, (df, _se, ce) => {
      return [
        df.message('Reality Check', 'Yes you did!'),
        df.custom('Time Out', ce.componentWithChildren(WaitToClick, <DialogPrimaryText>Well, if you're going to be like that, we're going to take a little break.</DialogPrimaryText>, { timeOut: 20000 }), () => {}),
        df.message('Lesson Learned?', `We hope you learned your lesson?`),
      ];
    }),
  ];
}