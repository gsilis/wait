import { DecisionValue } from "../../components/decision-value";
import { DialogPrimaryText } from "../../components/dialog-primary-text";
import { BLACK, BLUE, GRAY, GREEN, INDIGO, ORANGE, RED, VIOLET, WHITE, YELLOW } from "../../constants/colors";
import { CURRENT_WEATHER, FAVORITE_COLOR, REVIEW_FAVORITE_COLOR } from "../../constants/decision-type";
import type { Sequence } from "../../core/sequence";
import type { SequenceFactory } from "../../core/sequence-factory";
import { StoryId as ColorSurveyChangeMindStoryId } from "../color-survey-change-mind";

export const StoryId = 'color-survey' as const;
const NotFavoriteStoryId = 'not-favorite-story-id' as const;
const LieDetectorStoryId = 'color-survey-lie-detector' as const;
const ForgotStoryId = 'forgot-story-id' as const;
const YouWereRightStoryId = 'you-were-right-story-id' as const;
const WeatherStoryId = 'weather-story-id' as const;
const DeclineWeatherStoryId = 'decline-weather-story-id' as const;

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
        df.dialog('Double Check', () => <DialogPrimaryText>Is <DecisionValue decisionId={FAVORITE_COLOR} /> really your favorite color?</DialogPrimaryText>, 'Yes', 'No'),
        df.dialog('Triple Check', `Are you sure about that?`, 'Yes', 'No'),
        df.dialog('Triple Check v2.0.0', `So you're really sure about that?`, 'Yes', 'No'),
        df.dialog('Triple Check v2.0.1', `Really?`, 'Yes', 'No'),
        df.dialog('Triple Check v2.0.2', `I mean really??`, 'Yes', 'No'),
        df.dialog('Triple Check v2.0.3', `Do you even remember the color you picked?`, 'Yes', 'No'),
        df.dialog('Triple Check v2.1.0', 'You do, huh?', 'Yes', 'No'),
        df.dialog('Triple Check v2.1.1', `You sure about that?`, 'Yes', 'No'),
        df.cancel(ForgotStoryId),
        df.select(
          'Lie Detector v1.0.1',
          () => {},
          (result, decisions) => {
            return result === decisions?.decisions[FAVORITE_COLOR];
          },
          `Then which color did you pick?`,
          colors,
          `Submit`,
          `I remember`,
          true,
          `I don't remember`,
          `Or do I?`,
          LieDetectorStoryId
        ),
      ];
    }),

    sf.create(ForgotStoryId, (df) => {
      return [
        df.message('Lie Detector v1.1.0', `Looks like you forgot.`, `Ok`),
        df.message('Lie Detector v1.1.1', () => <>We didn't though, it was <DecisionValue decisionId={ FAVORITE_COLOR } />.</>, `Ok`),
        df.message('Lie Detector v1.1.2', `We're not sure what to do with this info yet though.`, `Ok`),
        df.message('Lie Detector v1.1.3', `Why not collect it?.`, `Ok`),
        df.message('Lie Detector v1.1.4', `Might be useful for something later.`, `Ok`),
        df.message('Lie Detector v1.1.5', `Whatever it is, you'll like it because it's your favorite color.`, `Ok`),
        df.message('Lie Detector v1.1.6', `That's how these things work.`, `Ok`),
        df.message('Lie Detector v1.1.7', `It's probably a nice day today where you are.`, `Ok`, '', WeatherStoryId),
      ];
    }),

    sf.create(WeatherStoryId, (df, se) => {
      return [
        df.cancel(DeclineWeatherStoryId),
        df.selectWithSideEffect(
          `Weather™`,
          se.saveTo(CURRENT_WEATHER),
          `What's the weather like today?`,
          [
            [`Sunny`, `The sun is shining.`, `sunny`],
            [`Partly Cloudy`, `There are some clouds, but not many.`, `partly-cloudy`],
            [`Mostly Sunny`, `Wait, what's the difference between "partly cloudy" and "mostly sunny"?`, `partly-sunny`],
            [`Overcast`, `The point of the sun is to create a nice diffuse light behind the clouds.`, `overcast`],
            [`Storms`, `The outdoor is out to get us, I swear.`, `storming`],
            [`Snow`, `The world is frozen outside.`, `snow`],
            [`Vacuum`, `For all we know, you're in space. They have internet there, right?`, `vacuum`],
            [`Desert`, `The weather is desert. It really is just its own weather category.`, `desert`],
            [`Robot Apocalypse`, `There is no more weather, the weather has been assimilated.`, `robot`],
          ],
          `Submit`,
          `And a good day to you, too.`,
          true,
          `Not Telling You`,
          `It's a secret`
        ),
      ];
    }),

    sf.create(DeclineWeatherStoryId, (df) => {
      return [
        df.message(`What, Why?`, `It's weather, it's not a secret!`, `Ok`),
        df.message(`What, Why?`, `Many other people are experiencing the same weather as you right now.`, `Ok`),
        df.message(`What, Why?`, `They wouldn't call it a secret.`, `Ok`),
      ];
    }),

    sf.create(LieDetectorStoryId, (df, se) => {
      return [
        df.cancel(YouWereRightStoryId),
        df.dialog(`Lie Detector v1.0.2`, `You sure that's the one?`, 'Yes', 'No'),
        df.dialog(`Lie Detector v1.0.3`, `Really sure?`, `Yes`, `No`),
        df.dialog(`Lie Detector v1.0.3-alpha`, `Do you remember which one you picked?`, `Yes`, `No`),
        df.message(`Lie Detector v1.0.4`, `We don't even remember, honsetly.`, `Ok`),
        df.message(`Lie Detector v1.0.5`, `Seriously, we didn't really save what you chose`, `Ok`),
        df.message(`Lie Detector v1.0.6`, () => <>We were just messing with you, your favorite color was <DecisionValue decisionId={ FAVORITE_COLOR } />.</>, `Ok`),
        df.selectWithSideEffect(`Lie Detector Review`, se.saveTo(REVIEW_FAVORITE_COLOR), `How do you feel about the color picking experience?`, [
          [`Great!`, `It was the single most best thing I've ever experienced. Ever.`, `picker-review-great`],
          [`Good`, `Would pick again.`, `picker-review-good`],
          [`Ok`, `It was meh.`, `picker-review-ok`],
          [`Bad`, `Just bad. Bad, bad, bad.`, `picker-review-bad`],
          [`Worst`, `Trash, not even hot trash. Kind of a lukewarm trash.`, `picker-review-trash`],
        ], 'Submit', '', false),
        df.message(`Thank You`, `Thanks for the review.`, `Ok`),
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

    sf.create(YouWereRightStoryId, (df) => {
      return [
        df.message(`Validation`, `You were right though!`, `Ok`),
        df.message(`Validation`, () => <>You chose <DecisionValue decisionId={ FAVORITE_COLOR } />...</>, `Ok`),
      ];
    }),
  ];
}