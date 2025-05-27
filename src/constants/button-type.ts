import type { MouseEventHandler } from "react";

export interface ButtonProps {
  children: any,
  disabled?: boolean,
  onClick: MouseEventHandler<HTMLButtonElement>,
  onMouseDown: MouseEventHandler<HTMLButtonElement>,
  onMouseUp: MouseEventHandler<HTMLButtonElement>,
  title?: string,
  progress?: number,
}