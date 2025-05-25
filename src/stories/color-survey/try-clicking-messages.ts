import type { ClickNTimesInterface } from "../../components/story-components/click-n-times";
import type { GraduatedValueItem } from "../../utilities/graduated-value";

export const TryClickingGoal = 50;
export const TryClickingEncouragements: GraduatedValueItem<string>[] = [
  [0, ``],
  [1, `Did anything happen?`],
  [3, `It's working!`],
  [6, `It's working?`],
  [9, `Actually..`],
  [10, `Actually..`],
  [11, `Actually...`],
  [12, `Actually....`],
  [13, `Actually.....`],
  [14, `Actually......`],
  [15, `Actually.......`],
  [16, `Actually........`],
  [17, `Actually.........`],
  [18, `Actually..........`],
  [19, `Actually...........`],
  [20, `Actually............`],
  [21, `Actually.............`],
  [22, `Actually..............`],
  [23, `Actually...............`],
  [24, `Is it working?`],
  [26, `OK...`],
  [30, `Keep going...`],
  [35, `Keep going.....`],
  [41, `Keep going.......`],
  [50, `Ok cool, we can continue.`]
];
export const TryClickingTitles: GraduatedValueItem<string>[] = [
  [0, `Click me`],
  [1, `Click me again...`],
  [2, `And again...`],
  [3, `So...`],
];

const componentOptions: ClickNTimesInterface = {
  encouragementStrings: TryClickingEncouragements,
  buttonStrings: TryClickingTitles,
  clicks: TryClickingGoal,
};

export default componentOptions;