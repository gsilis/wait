import type { ChildrenProps } from "../contexts/support/children-props";

export function DialogFooter({ children }: ChildrenProps) {
  return <div className="flex justify-end px-3 py-2">
    { children }
  </div>;
}