import { use, useCallback, useMemo } from "react";
import type { DialogType } from "../constants/dialog-type";
import OffsetCalculator from "../utilities/offset-calculator";
import { DialogManagerContext } from "../contexts/dialog-manager-context";
import { DecisionContext } from "../contexts/decision-context";
import { DialogRegistryContext } from "../contexts/dialog-registry-context";
import { DialogId as NullDialogId } from "../constants/null-dialog-type";

interface DialogContainerProps {
  disabled?: boolean,
  position: number,
  dialog: DialogType,
}

const offsets = (() => {
  const middle: any[] = [];
  return new OffsetCalculator([
    ['-m-20'],
    ['-m-16'],
    ['-m-12'],
    ['-m-8'],
    ['-m-4'],
    middle,
    ['m-4'],
    ['m-8'],
    ['m-12'],
    ['m-16'],
    ['m-20'],
  ], middle);
})();

/**
 * This is so you can add padding to the dialog based on its position.
 */
export function DialogContainer({
  disabled = false,
  position,
  dialog,
}: DialogContainerProps) {
  const manager = use(DialogManagerContext);
  const decisions = use(DecisionContext);
  const registry = use(DialogRegistryContext);
  const DialogComponent = dialog.component || (() => <p>Error displaying dialog.</p>);
  const classes = useMemo<string>(() => {
    const c: string[] = [
      'flex',
      'top-0',
      'left-0',
      'w-full h-full',
      'overflow-hidden',
      'absolute',
      'items-center',
      'justify-center',
      ...offsets.valuesFor(position),
    ];

    if (disabled) {
      c.push('pointer-events-none');
    }

    return c.join(' ');
  }, [position, disabled]);
  const doRouting = useCallback((result: boolean) => {
    try {
      dialog.handle(result, decisions);
      const nextRoute = dialog.route(decisions);
      const nextDialog = registry.getDialog(nextRoute);

      manager.addDialog(nextDialog);
    } catch (err) {
      console.group('DialogContainer handle click');
      console.error(`Could not route to next dialog`);
      console.info({ result });
      console.error(err);
      console.groupEnd();

      manager.addDialog(registry.getDialog(NullDialogId));
    }
  }, [dialog.route, dialog.handle, manager.addDialog, decisions, registry.getDialog]);
  const onAccept = useCallback(() => {
    doRouting(true);
  }, [doRouting]);
  const onDecline = useCallback(() => {
    doRouting(false);
  }, [doRouting]);

  return <div className={ classes }>
    <DialogComponent onAccept={ onAccept } onDecline={ onDecline } />
  </div>;
}