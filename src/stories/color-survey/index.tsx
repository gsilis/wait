import { DecisionValue } from "../../components/decision-value";
import { FAVORITE_COLOR } from "../../constants/decision-type";
import type { Sequence } from "../../core/sequence";
import type { SequenceFactory } from "../../core/sequence-factory";
import { StoryId as ColorSurveyChangeMindStoryId } from "../color-survey-change-mind";

export const StoryId = 'color-survey' as const;
const NotFavoriteStoryId = 'not-favorite-story-id' as const;

export default function ColorSurvey(sf: SequenceFactory): Sequence[] {
  return [
    sf.create(StoryId, (df, se) => {
      return [
        df.cancel(ColorSurveyChangeMindStoryId),
        df.selectWithSideEffect('Favorite Color', se.saveTo(FAVORITE_COLOR), 'What is your favorite color?', [
          ['Black', '', 'black'],
          ['White', '', 'white'],
          ['Gray', '', 'gray'],
          ['Red', '', 'red'],
          ['Orange', '', 'orange'],
          ['Yellow', '', 'yellow'],
          ['Green', '', 'green'],
          ['Blue', '', 'blue'],
          ['Indigo', '', 'indigo'],
          ['Violet', '', 'violet'],
        ], 'Submit', undefined, true, `Cancel`, undefined),
        df.cancel(NotFavoriteStoryId),
        df.dialog('Double Check', () => <>Is <DecisionValue decisionId={FAVORITE_COLOR} /> really your favorite color?</>),
      ];
    }),

    sf.create(NotFavoriteStoryId, (df, se) => {
      return [
        df.message('Confused', 'You picked a color that was not your favorite.'),
      ];
    }),
  ];
}