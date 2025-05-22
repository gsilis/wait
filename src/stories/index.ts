import StartStories, { StoryId as StartStoryId } from "./start";
import ColorSurvey, { StoryId as ColorStoryId } from "./color-survey";
import StartWhyNot, { StoryId as StartWhyNotId } from "./start-why-not";
import ColorSurveyChangeMind, { StoryId as ColorSurveyChangeMindStoryId } from "./color-survey-change-mind";
import type { StoryModuleCreator } from "./story-module-creator";

export type StoryId = (
    typeof StartStoryId
  | typeof ColorStoryId
  | typeof StartWhyNotId
  | typeof ColorSurveyChangeMindStoryId
);

export const stories: StoryModuleCreator[] = [
  StartStories,
  ColorSurvey,
  StartWhyNot,
  ColorSurveyChangeMind,
];