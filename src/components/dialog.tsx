import { use, useMemo } from "react";
import type { ChildrenProps } from "../contexts/support/children-props";
import { DialogTitleContext } from "../contexts/dialog-title-context";
import { DialogBackgroundContext } from "../contexts/dialog-background-context";
import { DialogShadowContext } from "../contexts/dialog-shadow-context";

interface DialogProps {
  title: string,
  className?: string,
}

export function Dialog({
  title,
  children,
  className,
}: ChildrenProps & DialogProps) {
  const dialogTitle = use(DialogTitleContext);
  const dialogBackground = use(DialogBackgroundContext);
  const dialogShadow = use(DialogShadowContext);
  const dialogClasses = useMemo<string>(() => {
    return [
      (className || ''),
      'flex',
      'flex-col',
      'w-full',
      'h-full',
      'md:w-xl',
      'md:min-h-48',
      'md:h-auto',
      dialogBackground.dialogBackgroundClasses,
      dialogShadow.dialogShadowClasses,
    ].join(' ');
  }, [
    dialogBackground.dialogBackgroundClasses,
    dialogShadow.dialogShadowClasses,
    className,
  ]);
  const titleClasses = useMemo<string>(() => {
    return [
      'flex-none',
      dialogTitle.titleClasses
    ].join(' ');
  }, [dialogTitle.titleClasses]);

  return <div className={ dialogClasses }>
    <div className={ titleClasses }>{ title }</div>
    { children }
  </div>;
}