import type { ChildrenProps } from "../contexts/support/children-props";

export function DialogTitle({ children }: ChildrenProps) {
  return <p className="text-bold text-2xl text-center my-4">{ children }</p>;
}