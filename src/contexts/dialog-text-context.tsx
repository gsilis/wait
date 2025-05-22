import { createContext, useMemo } from "react";
import type { ChildrenProps } from "./support/children-props";

interface DialogTextInterface {
  primaryTextClasses: string,
  secondaryTextClasses: string,
}

export const DialogTextContext = createContext<DialogTextInterface>({
  primaryTextClasses: '',
  secondaryTextClasses: '',
});

export function DialogTextProvider({ children }: ChildrenProps) {
  const primaryTextClasses = useMemo<string>(() => {
    const c = [
      'text-slate-800',
      'dark:text-slate-100',
    ];

    return c.join(' ');
  }, []);
  const secondaryTextClasses = useMemo<string>(() => {
    const c = [
      'text-slate-600',
      'dark:text-slate-300',
    ];

    return c.join(' ');
  }, []);

  const api: DialogTextInterface = {
    primaryTextClasses,
    secondaryTextClasses,
  };

  return <DialogTextContext value={ api }>{ children }</DialogTextContext>;
}