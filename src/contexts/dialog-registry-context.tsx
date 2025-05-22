import { createContext, useCallback, useMemo } from "react";
import { type DialogType } from "../constants/dialog-type";
import { DialogRegistry } from "../core/dialog-registry";
import type { ChildrenProps } from "./support/children-props";
import { NullDialogType } from "../constants/null-dialog-type";

export interface DialogRegistryInterface {
  registry: DialogRegistry,
  addDialog: (id: string, dialog: DialogType) => void,
  getDialog: (id: string) => DialogType,
}

export const DialogRegistryContext = createContext<DialogRegistryInterface>({
  registry: new DialogRegistry(),
  addDialog: (_id: string, _dialog: DialogType) => {},
  getDialog: (_id: string) => {
    throw new Error('Context not properly implemented.');
  },
});

export function DialogRegistryProvider({ children }: ChildrenProps) {
  const registry = useMemo<DialogRegistry>(() => {
    return new DialogRegistry();
  }, []);
  const getDialog = useCallback((id: string): DialogType => {
    try {
      return registry.dialogFor(id);
    } catch (err) {
      console.group(`DialogRegistry.getDialog(${id})`);
      console.info(`Could not fetch dialog settings.`);
      console.error(err);
      console.groupEnd();
      return NullDialogType;
    }
  }, [registry.dialogFor]);
  const addDialog = useCallback((id: string, dialog: DialogType) => {
    registry.register(id, dialog);
  }, [registry.register]);
  const api: DialogRegistryInterface = {
    registry,
    addDialog,
    getDialog,
  };

  return <DialogRegistryContext value={ api }>{ children }</DialogRegistryContext>;
}