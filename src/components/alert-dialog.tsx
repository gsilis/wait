import type { DialogProps } from "../constants/dialog-props";
import type { ChildrenProps } from "../contexts/support/children-props";
import { Dialog } from "./dialog";
import { DialogContent } from "./dialog-content";
import { DialogFooter } from "./dialog-footer";
import { PrimaryButton } from "./primary-button";

export interface AlertDialogInterface extends DialogProps, ChildrenProps {
  accept?: CallableFunction,
  confirmText: string,
  confirmTitle?: string,
}

export default function AlertDialog({
  accept,
  confirmText,
  confirmTitle,
  children,
  title,
}: AlertDialogInterface) {
  return <Dialog title={ title }>
    <DialogContent>
      { children }
    </DialogContent>
    <DialogFooter>
      <PrimaryButton onClick={ () => { accept && accept() } } title={ confirmTitle }>
        { confirmText }
      </PrimaryButton>
    </DialogFooter>
  </Dialog>;
}