import { DecisionValue } from "../../components/decision-value";
import { FAVORITE_COLOR } from "../../constants/decision-type";
import type { Sequence } from "../../core/sequence";
import type { SequenceFactory } from "../../core/sequence-factory";
import { StoryId as ColorSurveyChangeMindStoryId } from "../color-survey-change-mind";

export const StoryId = 'color-survey' as const;

export default function ColorSurvey(sf: SequenceFactory): Sequence[] {
  return [
    sf.create(StoryId, (df, se) => {
      return [
        df.cancel(ColorSurveyChangeMindStoryId),
        df.selectWithSideEffect('Favorite Color', se.saveTo(FAVORITE_COLOR), 'What is your favorite color?', [
          ['Black'], ['White'], ['Gray'], ['Red'], ['Orange'], ['Yellow'], ['Green'], ['Blue'], ['Indigo'], ['Violet']
        ], 'Submit', undefined, true, `Cancel`, undefined),
        df.message('Double Check', () => <>Is <DecisionValue decisionId={FAVORITE_COLOR} /> really your favorite color?</>),
      ];
    }),
  ];
}