import { use } from "react";
import type { ButtonProps } from "../constants/button-type";
import { PrimaryButtonContext } from "../contexts/primary-button-context";

export function PrimaryButton({
  children,
  disabled = false,
  onClick,
  title,
}: ButtonProps) {
  const classContext = use(PrimaryButtonContext);

  return <button title={ title } disabled={ disabled } onClick={ onClick } className={ classContext.primaryButtonClasses }>
    { children }
  </button>;
}