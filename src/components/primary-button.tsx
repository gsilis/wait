import { use, useMemo } from "react";
import type { ButtonProps } from "../constants/button-type";
import { PrimaryButtonContext } from "../contexts/primary-button-context";

export function PrimaryButton({
  children,
  disabled = false,
  onClick,
  title,
}: ButtonProps) {
  const classContext = use(PrimaryButtonContext);
  const classes = useMemo<string>(() => {
    const c: string[] = [classContext.primaryButtonClasses];

    if (disabled) {
      c.push('opacity-50');
    }

    return c.join(' ');
  }, [classContext.primaryButtonClasses, disabled]);

  return <button title={ title } disabled={ disabled } onClick={ onClick } className={ classes }>
    { children }
  </button>;
}