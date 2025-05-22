import { use, useMemo } from "react";
import type { ButtonProps } from "../constants/button-type";
import { SecondaryButtonContext } from "../contexts/secondary-button-context";

export function SecondaryButton({
  children,
  disabled = false,
  onClick,
  title,
}: ButtonProps) {
  const classContext = use(SecondaryButtonContext);
  const classes = useMemo<string>(() => {
    const c: string[] = [classContext.secondaryButtonClasses];

    if (disabled) {
      c.push('opacity-50');
    }

    return c.join(' ');
  }, [classContext.secondaryButtonClasses, disabled]);

  return <button title={ title } disabled={ disabled } onClick={ onClick } className={ classes }>
    { children }
  </button>;
}