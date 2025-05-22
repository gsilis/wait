import type { DialogProps } from "../constants/dialog-props";
import type { ChildrenProps } from "../contexts/support/children-props";
import { Dialog } from "./dialog";
import { DialogContent } from "./dialog-content";
import { DialogFooter } from "./dialog-footer";
import { PrimaryButton } from "./primary-button";
import { SecondaryButton } from "./secondary-button";

export interface ConfirmDialogInterface extends DialogProps, ChildrenProps {
  accept?: CallableFunction,
  decline?: CallableFunction,
  confirmText: string,
  confirmTitle?: string,
  cancelText: string,
  cancelTitle?: string,
}

export default function ConfirmDialog({
  accept,
  decline,
  confirmText,
  confirmTitle,
  cancelText,
  cancelTitle,
  title,
  children,
}: ConfirmDialogInterface) {
  return <Dialog title={ title }>
    <DialogContent>
      { children }
    </DialogContent>
    <DialogFooter>
      <SecondaryButton onClick={ () => { decline && decline() } } title={ cancelTitle }>
        { cancelText }
      </SecondaryButton>
      <PrimaryButton onClick={ () => { accept && accept() } } title={ confirmTitle }>
        { confirmText }
      </PrimaryButton>
    </DialogFooter>
  </Dialog>;
}