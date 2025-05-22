import { use } from "react";
import type { ButtonProps } from "../constants/button-type";
import { SecondaryButtonContext } from "../contexts/secondary-button-context";

export function SecondaryButton({
  children,
  disabled = false,
  onClick,
  title,
}: ButtonProps) {
  const classContext = use(SecondaryButtonContext);

  return <button title={ title } disabled={ disabled } onClick={ onClick } className={ classContext.secondaryButtonClasses }>
    { children }
  </button>;
}