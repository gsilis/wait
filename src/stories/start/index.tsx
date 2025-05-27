import { DialogPrimaryText } from "../../components/dialog-primary-text";
import { ClickNSeconds } from "../../components/story-components/click-n-seconds";
import { SURVEY } from "../../constants/decision-type";
import type { Sequence } from "../../core/sequence";
import type { SequenceFactory } from "../../core/sequence-factory";
import { GraduatedValue } from "../../utilities/graduated-value";
import { StoryId as ColorSurveyStoryId } from "../color-survey";
import { StoryId as StartWhyNotStoryId } from "../start-why-not";

export const StoryId = 'start' as const;

const clickNSecondsMessages = new GraduatedValue<string>();
clickNSecondsMessages.add(1, `You have to hold the button...`);
clickNSecondsMessages.add(2, `Please hold the button...`);
clickNSecondsMessages.add(3, `There isn't anything else that happens if you let the button go.`);
clickNSecondsMessages.add(4, `Seriously, nothing else happens.`);
clickNSecondsMessages.add(5, `Well, there may be more messages.`);
clickNSecondsMessages.add(6, `Maybe.`);
clickNSecondsMessages.add(7, `I said maybe!`);
clickNSecondsMessages.add(8, `Uh oh, I see what is happening here...`);
clickNSecondsMessages.add(9, `By creating these messages, I'm reinforcing the behavior I don't want.`);
clickNSecondsMessages.add(10, `Because you're expecting something new each time you give up holding the button.`);
clickNSecondsMessages.add(11, `And we really want you to press and hold the button.`);
clickNSecondsMessages.add(12, `Because we don't gain anything by you releasing the button prematurely.`);
clickNSecondsMessages.add(13, `Not that we gain anything either way.`);
clickNSecondsMessages.add(14, `This is not about us.`);
clickNSecondsMessages.add(15, `This is about you.`);
clickNSecondsMessages.add(16, `Ok this is the last one.`);
clickNSecondsMessages.add(18, `We said that was the last one!`);
clickNSecondsMessages.add(20, `You're really reaching the end of these messages...`);
clickNSecondsMessages.add(30, `Ok, we are trying to keep you here.`);
clickNSecondsMessages.add(40, `We don't know why...`);
clickNSecondsMessages.add(41, `Wait, we didn't say that.`);
clickNSecondsMessages.add(42, `ERR 404: Content Not Found`);

export default function StartStories(sf: SequenceFactory): Sequence[] {
  return [
    sf.create(StoryId, (df, se, cf) => {
      return [
        df.cancel(StartWhyNotStoryId),
        df.message('Oops', 'We could not load the content.'),
        df.dialogWithSideEffect('Survey', 'How about answering some questions while you wait?', se.saveTo(SURVEY), 'Yes', 'No', undefined, undefined, ColorSurveyStoryId),
      ];
    }),
  ];
}