import { createContext, useMemo } from "react";
import type { ChildrenProps } from "./support/children-props";

interface PrimaryButtonInterface {
  primaryButtonClasses: string,
}

export const PrimaryButtonContext = createContext<PrimaryButtonInterface>({
  primaryButtonClasses: '',
});

export function PrimaryButtonProvider({ children }: ChildrenProps) {
  const classes = useMemo<string>(() => {
    return [
      'border-1',
      'px-2 py-1',
      'min-w-20',
      'uppercase',
      'text-xs',
      'font-bold',
      'hover:cursor-pointer',

      'border-slate-950',
      'bg-slate-100',
      'text-slate-950',

      'dark:border-slate-50',
      'dark:bg-slate-800',
      'dark:text-slate-50',
    ].join(' ');
  }, []);
  const api: PrimaryButtonInterface = {
    primaryButtonClasses: classes,
  };

  return <PrimaryButtonContext value={ api }>{ children }</PrimaryButtonContext>;
}