import type { DialogProps } from "../constants/dialog-props";
import type { ChildrenProps } from "../contexts/support/children-props";
import { Dialog } from "./dialog";
import { DialogContent } from "./dialog-content";
import { DialogFooter } from "./dialog-footer";
import { PrimaryButton } from "./primary-button";

export interface AlertDialogInterface extends DialogProps, ChildrenProps {
  accept?: CallableFunction,
  className?: string,
  confirmText: string,
  confirmTitle?: string,
}

export default function AlertDialog({
  accept,
  className,
  confirmText,
  confirmTitle,
  children,
  title,
}: AlertDialogInterface) {
  return <Dialog title={ title } className={ className }>
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