import { createContext, useMemo } from "react";
import type { ChildrenProps } from "./support/children-props";

interface DialogTitleInterface {
  titleClasses: string,
}

export const DialogTitleContext = createContext<DialogTitleInterface>({
  titleClasses: '',
});

export function DialogTitleProvider({ children }: ChildrenProps) {
  const classes = useMemo<string>(() => {
    return [
      'px-2 py-1',
      'text-md',
      'border-1',
      'bg-linear-to-bl',

      'text-slate-50',
      'from-slate-500',
      'to-slate-950',
      'border-slate-700',

      'dark:text-slate-800',
      'dark:from-slate-300',
      'dark:to-slate-600',
      'dark:border-slate-500',
    ].join(' ');
  }, []);
  const api: DialogTitleInterface = {
    titleClasses: classes,
  };

  return <DialogTitleContext value={ api }>{ children }</DialogTitleContext>;
}