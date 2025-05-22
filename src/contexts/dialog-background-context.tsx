import { createContext, useMemo } from "react";
import type { ChildrenProps } from "./support/children-props";

interface DialogBackgroundInterface {
  dialogBackgroundClasses: string,
}

export const DialogBackgroundContext = createContext<DialogBackgroundInterface>({
  dialogBackgroundClasses: '',
});

export function DialogBackgroundProvider({ children }: ChildrenProps) {
  const classes = useMemo<string>(() => {
    return [
      'bg-linear-to-br',
      'border-1',

      'border-slate-300',
      'from-slate-50 to-slate-300',

      'dark:from-slate-900 dark:to-slate-700',
      'dark:border-slate-800'
    ].join(' ');
  }, []);

  const api: DialogBackgroundInterface = {
    dialogBackgroundClasses: classes,
  };

  return <DialogBackgroundContext value={ api }>{ children }</DialogBackgroundContext>;
}