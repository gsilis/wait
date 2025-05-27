import { use, useMemo } from "react";
import type { ButtonProps } from "../constants/button-type";
import { PrimaryButtonContext } from "../contexts/primary-button-context";
import { loadingClassFor } from "../utilities/loading-classes";

export function PrimaryButton({
  children,
  disabled = false,
  onClick,
  onMouseDown = () => {},
  onMouseUp = () => {},
  title,
  progress = 100,
}: ButtonProps) {
  const classContext = use(PrimaryButtonContext);
  const classes = useMemo<string>(() => {
    const c: string[] = [classContext.primaryButtonClasses];

    if (progress < 100) {
      c.push(classContext.primaryLoadingClasses);
      c.push(loadingClassFor(progress));
    }

    if (disabled) {
      c.push('opacity-50');
    }

    return c.join(' ');
  }, [
    classContext.primaryButtonClasses,
    classContext.primaryLoadingClasses,
    disabled,
    progress
  ]);

  return <button
    title={ title }
    disabled={ disabled }
    onClick={ onClick }
    onMouseDown={ onMouseDown }
    onMouseUp={ onMouseUp }
    className={ classes }
  >
    { children }
  </button>;
}