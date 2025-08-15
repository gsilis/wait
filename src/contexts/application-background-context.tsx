import { createContext, useMemo } from "react";
import type { ChildrenProps } from "./support/children-props";

interface ApplicationBackgroundInterface {
  applicationBackgroundClasses: string,
}

export const ApplicationBackgroundContext = createContext<ApplicationBackgroundInterface>({
  applicationBackgroundClasses: '',
});

export function ApplicationBacktroundProvider({ children }: ChildrenProps) {
  const applicationBackgroundClasses = useMemo<string>(() => {
    return [
      'bg-linear-to-bl',
      'from-slate-200 to-slate-400',
      'dark:from-slate-800 dark:to-slate-950',
    ].join(' ');
  }, []);
  const api: ApplicationBackgroundInterface = {
    applicationBackgroundClasses,
  };

  return <ApplicationBackgroundContext value={ api }>{ children }</ApplicationBackgroundContext>
}