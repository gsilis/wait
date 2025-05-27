import { useCallback, useMemo, useState, type ChangeEvent } from "react";
import type { DialogComponentProps } from "../../constants/dialog-type";
import type { ChildrenProps } from "../../contexts/support/children-props";
import { GraduatedValue, type GraduatedValueItem } from "../../utilities/graduated-value";
import { DialogContent } from "../dialog-content";
import { DialogFooter } from "../dialog-footer";
import { PrimaryButton } from "../primary-button";
import { DialogPrimaryText } from "../dialog-primary-text";

interface RangeSliderInterface {
  step: number,
  stepMessages: GraduatedValueItem<string>[],
  max: number,
  defaultValue: number,
}

export function RangeSlider({
  children,
  defaultValue,
  step = 1,
  stepMessages = [],
}: DialogComponentProps & ChildrenProps & RangeSliderInterface) {
  const [value, setValue] = useState<number>(defaultValue);
  const messages = useMemo(() => {
    const values = new GraduatedValue<string>();

    stepMessages.forEach((m) => {
      values.add(m[0], m[1]);
    });

    return values;
  }, [stepMessages.length]);
  const onSubmit = useCallback(() => {
    console.log(`Submitting value ${value}`);
  }, [value]);
  const onRange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const range = event.target.value;

    console.log(`${range}`);
  }, []);
  const message = useMemo<string>(() => {
    return messages.valueFor(value, '');
  }, [messages.valueFor, value]);

  return <>
    <DialogContent>
      { children }
      <input type="range" onChange={ onRange } value={ value } step={ step } />
      { message && <DialogPrimaryText>{ message }</DialogPrimaryText> }
    </DialogContent>
    <DialogFooter>
      <PrimaryButton onClick={ onSubmit }>Submit</PrimaryButton>
    </DialogFooter>
  </>;
}