import { useCallback, useState } from "react";
import type { DialogProps } from "../constants/dialog-props";
import type { ChildrenProps } from "../contexts/support/children-props";
import { Dialog } from "./dialog";
import { DialogContent } from "./dialog-content";
import { DialogFooter } from "./dialog-footer";
import { PrimaryButton } from "./primary-button";
import { SecondaryButton } from "./secondary-button";
import { TileSelect, type TileSelectOption } from "./tile-select";

interface DialogSelectProps extends DialogProps, ChildrenProps {
  options: TileSelectOption[],
  selected?: string,
  accept?: CallableFunction,
  decline?: CallableFunction,
  cancelable?: boolean,
  confirmText: string,
  confirmTitle?: string,
  cancelText?: string,
  cancelTitle?: string,
};

export function DialogSelect({
  options,
  selected,
  accept,
  decline,
  cancelable,
  confirmText,
  confirmTitle,
  cancelText,
  cancelTitle,
  title,
  children,
}: DialogSelectProps) {
  const [selectedId, setSelectedId] = useState<string | undefined>(selected);
  const onConfirm = useCallback(() => {
    accept && accept(selectedId);
  }, [accept, selectedId]);

  return <Dialog title={ title }>
    <DialogContent>
      { children }
      <TileSelect options={ options } onSelect={ setSelectedId } selected={ selectedId } />
    </DialogContent>
    <DialogFooter>
      { cancelable && (
        <SecondaryButton onClick={ () => decline && decline() } title={ cancelTitle }>
          { cancelText }
        </SecondaryButton>
      ) }
      <PrimaryButton onClick={ onConfirm } title={ confirmTitle } disabled={ !selectedId }>
        { confirmText }
      </PrimaryButton>
    </DialogFooter>
  </Dialog>;
}