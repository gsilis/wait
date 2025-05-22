import { use, useMemo } from "react";
import { DialogManagerContext, type DialogManagerItem } from "../contexts/dialog-manager-context";
import { DialogContainer } from "./dialog-container";

const MAX_DIALOGS = 20;

export function DialogRenderer() {
  const dialogManager = use(DialogManagerContext);
  const dialogs = useMemo<DialogManagerItem[]>(() => {
    return [...dialogManager.dialogs].slice(-MAX_DIALOGS);
  }, [dialogManager.dialogs.length]);
  const lastDialog = dialogs.slice(-1)[0];

  return <div className="w-screen h-screen overflow-hidden">
    { dialogs.map((config, key) => <DialogContainer dialog={ config.dialog } key={ key } position={ config.position } disabled={ config != lastDialog }></DialogContainer>) }
  </div>;
}