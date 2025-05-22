export const SURVEY = 'survey';
export const FAVORITE_COLOR = 'favorite-color';

export type Decision = (
    typeof SURVEY
  | typeof FAVORITE_COLOR
);