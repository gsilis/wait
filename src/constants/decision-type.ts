export const SURVEY = 'survey';
export const FAVORITE_COLOR = 'favorite-color';
export const REVIEW_FAVORITE_COLOR = 'review-favorite-color';
export const CURRENT_WEATHER = 'current-weather';

export type Decision = (
    typeof SURVEY
  | typeof FAVORITE_COLOR
  | typeof REVIEW_FAVORITE_COLOR
  | typeof CURRENT_WEATHER
);