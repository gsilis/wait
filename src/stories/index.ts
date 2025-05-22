import StartStories, { StoryId as StartStoryId } from "./start";
import type { StoryModuleCreator } from "./story-module-creator";

export type StoryId = (
  typeof StartStoryId
);

export const stories: StoryModuleCreator[] = [
  StartStories,
];