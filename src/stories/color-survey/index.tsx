import { DecisionValue } from "../../components/decision-value";
import { ClickNTimes } from "../../components/story-components/click-n-times";
import { BLACK, BLUE, GRAY, GREEN, INDIGO, ORANGE, RED, VIOLET, WHITE, YELLOW } from "../../constants/colors";
import { FAVORITE_COLOR } from "../../constants/decision-type";
import type { Sequence } from "../../core/sequence";
import type { SequenceFactory } from "../../core/sequence-factory";
import { StoryId as ColorSurveyChangeMindStoryId } from "../color-survey-change-mind";
import componentOptions from "./try-clicking-messages";

export const StoryId = 'color-survey' as const;
const NotFavoriteStoryId = 'not-favorite-story-id' as const;

const colors: [title: string, message: string, value: string][] = [
  ['Black', '', BLACK],
  ['White', '', WHITE],
  ['Gray', '', GRAY],
  ['Red', '', RED],
  ['Orange', '', ORANGE],
  ['Yellow', '', YELLOW],
  ['Green', '', GREEN],
  ['Blue', '', BLUE],
  ['Indigo', '', INDIGO],
  ['Violet', '', VIOLET],
];

export default function ColorSurvey(sf: SequenceFactory): Sequence[] {
  return [
    sf.create(StoryId, (df, se, cf) => {
      return [
        df.cancel(ColorSurveyChangeMindStoryId),
        df.selectWithSideEffect('Favorite Color', se.saveTo(FAVORITE_COLOR), 'What is your favorite color?', colors, 'Submit', undefined, true, `Cancel`),
        df.cancel(NotFavoriteStoryId),
        df.dialog('Double Check', () => <>Is <DecisionValue decisionId={FAVORITE_COLOR} /> really your favorite color?</>, 'Yes', 'No'),
        df.custom(
          'Try Clicking',
          cf.componentWithChildren(
            ClickNTimes,
            `Click the button a bunch of times.`,
            componentOptions
          ),
          () => {}
        ),
      ];
    }),

    sf.create(NotFavoriteStoryId, (df) => {
      return [
        df.message('Confused', 'You picked a color that was not your favorite.'),
        df.selectWithSideEffect('Tell us Why', () => {}, `Why did you pick a color you don't like?`, [
          [`I don't know why.`, `I have no idea why.`, 'color-dont-know'],
          [`I'm messing with you.`, `I'm just kidding, it really is my favorite.`, 'color-messing-with'],
          [`Other`, `Your two options didn't cover it.`, `color-other`]
        ], 'Submit', '', false),
      ];
    }),
  ];
}