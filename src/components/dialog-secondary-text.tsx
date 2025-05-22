import { use, useMemo } from "react";
import type { ChildrenProps } from "../contexts/support/children-props";
import { DialogTextContext } from "../contexts/dialog-text-context";

export function DialogSecondaryText({ children }: ChildrenProps) {
  const textContext = use(DialogTextContext);
  const classes = useMemo<string>(() => {
    return [
      'text-sm',
      textContext.secondaryTextClasses,
    ].join(' ');
  }, [textContext.secondaryTextClasses]);

  return <div className={ classes }>{ children }</div>;
}