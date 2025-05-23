import { use, useMemo } from "react";
import type { ButtonProps } from "../constants/button-type";
import { SecondaryButtonContext } from "../contexts/secondary-button-context";
import { loadingClassFor } from "../utilities/loading-classes";

export function SecondaryButton({
  children,
  disabled = false,
  onClick,
  title,
  progress = 100,
}: ButtonProps) {
  const classContext = use(SecondaryButtonContext);
  const classes = useMemo<string>(() => {
    const c: string[] = [classContext.secondaryButtonClasses];

    if (progress < 100) {
      c.push(classContext.secondaryLoadingClasses);
      c.push(loadingClassFor(progress));
    }

    if (disabled) {
      c.push('opacity-50');
    }

    return c.join(' ');
  }, [
    classContext.secondaryButtonClasses,
    classContext.secondaryLoadingClasses,
    disabled,
    progress,
  ]);

  return <button title={ title } disabled={ disabled } onClick={ onClick } className={ classes }>
    { children }
  </button>;
}