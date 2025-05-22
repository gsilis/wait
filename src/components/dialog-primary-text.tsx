import { use, useMemo } from "react";
import type { ChildrenProps } from "../contexts/support/children-props";
import { DialogTextContext } from "../contexts/dialog-text-context";

export function DialogPrimaryText({ children }: ChildrenProps) {
  const textContext = use(DialogTextContext);
  const classes = useMemo<string>(() => {
    return [
      'text-md',
      textContext.primaryTextClasses,
    ].join(' ');
  }, [textContext.primaryTextClasses]);

  return <div className={ classes }>{ children }</div>;
}