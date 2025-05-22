import type { MouseEventHandler } from "react";

export interface ButtonProps {
  children: any,
  disabled?: boolean,
  onClick: MouseEventHandler<HTMLButtonElement>,
  title?: string,
}