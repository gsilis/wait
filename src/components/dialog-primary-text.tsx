import { use, useMemo } from "react";
import type { ChildrenProps } from "../contexts/support/children-props";
import { DialogTextContext } from "../contexts/dialog-text-context";
import type { ClassNameProps } from "../contexts/support/classname-props";
import { classNames } from "../utilities/class-name";

export function DialogPrimaryText({ children, className }: ChildrenProps & ClassNameProps) {
  const textContext = use(DialogTextContext);
  const classes = useMemo<string>(() => {
    return classNames('text-md', 'my-2', textContext.primaryTextClasses, className);
  }, [textContext.primaryTextClasses, className]);

  return <div className={ classes }>{ children }</div>;
}