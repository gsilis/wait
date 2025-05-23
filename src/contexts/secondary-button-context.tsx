import { createContext, useMemo } from "react";
import type { ChildrenProps } from "./support/children-props";

interface SecondaryButtonInterface {
  secondaryButtonClasses: string,
  secondaryLoadingClasses: string,
}

export const SecondaryButtonContext = createContext<SecondaryButtonInterface>({
  secondaryButtonClasses: '',
  secondaryLoadingClasses: '',
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
      'hover:bg-slate-0',
      'text-slate-800',

      'dark:border-slate-100',
      'dark:bg-slate-900',
      'dark:hover:bg-slate-800',
      'dark:text-slate-200',
    ].join(' ');
  }, []);
  const loadingClasses = useMemo<string>(() => {
    return [
      'bg-linear-to-r',
      'from-0%',
      'from-slate-50 via-slate-300 to-slate-0',
      'dark:from-slate-800 dark:via-slate-900 dark:to-slate-700',
    ].join(' ');
  }, []);
  const api: SecondaryButtonInterface = {
    secondaryButtonClasses: classes,
    secondaryLoadingClasses: loadingClasses,
  };

  return <SecondaryButtonContext value={ api }>{ children }</SecondaryButtonContext>;
}