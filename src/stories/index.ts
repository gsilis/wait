import StartStories, { StoryId as StartStoryId } from "./start";
import ColorSurvey, { StoryId as ColorStoryId } from "./color-survey";
import StartWhyNot, { StoryId as StartWhyNotId } from "./start-why-not";
import type { StoryModuleCreator } from "./story-module-creator";

export type StoryId = (
    typeof StartStoryId
  | typeof ColorStoryId
  | typeof StartWhyNotId
);

export const stories: StoryModuleCreator[] = [
  StartStories,
  ColorSurvey,
  StartWhyNot,
];