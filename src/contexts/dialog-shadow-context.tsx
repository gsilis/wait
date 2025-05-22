import { createContext, useMemo } from "react";
import type { ChildrenProps } from "./support/children-props";

interface DialogShadowInterface {
  dialogShadowClasses: string,
}

export const DialogShadowContext = createContext<DialogShadowInterface>({
  dialogShadowClasses: '',
});

export function DialogShadowProvider({ children }: ChildrenProps) {
  const classes = useMemo<string>(() => {
    return [
      'shadow-2xl',
      'shadow-slate-950'
    ].join(' ');
  }, []);
  const api: DialogShadowInterface = {
    dialogShadowClasses: classes,
  };

  return <DialogShadowContext value={ api }>{ children }</DialogShadowContext>;
}