import { createContext, useCallback, useState } from "react";
import type { ChildrenProps } from "./support/children-props";
import type { DialogType } from "../constants/dialog-type";

export type DialogManagerItem = { dialog: DialogType, position: number };

interface DialogManagerInterface {
  dialogs: DialogManagerItem[],
  addDialog: (dialog: DialogType) => void,
}

export const DialogManagerContext = createContext<DialogManagerInterface>({
  dialogs: [],
  addDialog: (_dialog: DialogType) => {},
});

export function DialogManagerProvider({ children }: ChildrenProps) {
  const [dialogs, setDialogs] = useState<{ dialog: DialogType, position: number }[]>([]);
  const addDialog = useCallback((dialog: DialogType) => {
    setDialogs(existingDialogs => [...existingDialogs, { dialog, position: existingDialogs.length }]);
  }, [setDialogs]);

  const api: DialogManagerInterface = {
    dialogs,
    addDialog,
  };

  return <DialogManagerContext value={ api }>{ children }</DialogManagerContext>;
}