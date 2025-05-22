import type { ChildrenProps } from "../contexts/support/children-props";

export function DialogContent({ children }: ChildrenProps) {
  return <div className="px-3 py-2 flex-1">
    { children }
  </div>;
}