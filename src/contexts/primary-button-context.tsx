import { createContext, useMemo } from "react";
import type { ChildrenProps } from "./support/children-props";

interface PrimaryButtonInterface {
  primaryButtonClasses: string,
  primaryLoadingClasses: string,
}

export const PrimaryButtonContext = createContext<PrimaryButtonInterface>({
  primaryButtonClasses: '',
  primaryLoadingClasses: '',
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
      'hover:bg-slate-50',
      'text-slate-950',

      'dark:border-slate-50',
      'dark:bg-slate-800',
      'dark:hover:bg-slate-900',
      'dark:text-slate-50',
    ].join(' ');
  }, []);
  const loadingClasses = useMemo<string>(() => {
    return [
      'bg-linear-to-r',
      'from-0%',
      'from-slate-200 via-slate-400 to-slate-50',
      'dark:from-slate-900 dark:via-slate-800 dark:to-slate-700',
    ].join(' ');
  }, []);
  const api: PrimaryButtonInterface = {
    primaryButtonClasses: classes,
    primaryLoadingClasses: loadingClasses,
  };

  return <PrimaryButtonContext value={ api }>{ children }</PrimaryButtonContext>;
}