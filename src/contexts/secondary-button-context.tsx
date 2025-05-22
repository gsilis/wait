import { createContext, useMemo } from "react";
import type { ChildrenProps } from "./support/children-props";

interface SecondaryButtonInterface {
  secondaryButtonClasses: string,
}

export const SecondaryButtonContext = createContext<SecondaryButtonInterface>({
  secondaryButtonClasses: '',
});

export function SecondaryButtonProvider({ children }: ChildrenProps) {
  const classes = useMemo<string>(() => {
    return [
      'border-1',
      'px-2 py-1',
      'min-w-20',
      'uppercase',
      'text-xs',
      'font-bold',
      'hover:cursor-pointer',

      'border-slate-800',
      'bg-slate-50',
      'text-slate-800',

      'dark:border-slate-100',
      'dark:bg-slate-900',
      'dark:text-slate-200',
    ].join(' ');
  }, []);
  const api: SecondaryButtonInterface = {
    secondaryButtonClasses: classes,
  };

  return <SecondaryButtonContext value={ api }>{ children }</SecondaryButtonContext>;
}