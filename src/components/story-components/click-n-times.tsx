import { useCallback, useMemo, useState } from "react";
import type { DialogComponentProps } from "../../constants/dialog-type";
import type { ChildrenProps } from "../../contexts/support/children-props";
import { DialogContent } from "../dialog-content";
import { DialogFooter } from "../dialog-footer";
import { PrimaryButton } from "../primary-button";
import { GraduatedValue, type GraduatedValueItem } from "../../utilities/graduated-value";
import { DialogPrimaryText } from "../dialog-primary-text";

export interface ClickNTimesInterface {
  clicks?: number,
  encouragementStrings?: GraduatedValueItem<string>[],
  buttonStrings?: GraduatedValueItem<string>[],
}

export function ClickNTimes({
  children,
  clicks = 1,
  onAccept,
  encouragementStrings = [],
  buttonStrings = [],
}: DialogComponentProps & ChildrenProps & ClickNTimesInterface) {
  const [currentClicks, setCurrentClicks] = useState<number>(0);
  const encouragementValues = useMemo<GraduatedValue<string>>(() => {
    const values = new GraduatedValue<string>();

    encouragementStrings.forEach(v => values.add(v[0], v[1]));

    return values;
  }, [encouragementStrings.length]);
  const buttonValues = useMemo<GraduatedValue<string>>(() => {
    const values = new GraduatedValue<string>();

    buttonStrings.forEach(v => values.add(v[0], v[1]));

    return values;
  }, [buttonStrings.length]);
  const encouragement = useMemo<string>(() => {
    return encouragementValues.valueFor(currentClicks, '');
  }, [currentClicks, encouragementValues.valueFor]);
  const buttonTitle = useMemo<string>(() => {
    return buttonValues.valueFor(currentClicks, '');
  }, [currentClicks, buttonValues.valueFor]);
  const onClick = useCallback(() => {
    if (currentClicks >= clicks) {
      onAccept && onAccept();
    } else {
      setCurrentClicks(c => c + 1);
    }
  }, [
    setCurrentClicks,
    currentClicks,
    clicks,
    onAccept,
  ]);

  return <>
    <DialogContent>
      { children }
      <DialogPrimaryText>{ encouragement }</DialogPrimaryText>
    </DialogContent>
    <DialogFooter>
      <PrimaryButton onClick={ onClick } title={ buttonTitle }>Ok</PrimaryButton>
    </DialogFooter>
  </>;
}