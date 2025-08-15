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
  const middle: any[] = ['mt-0', 'h-90/100'];
  return new OffsetCalculator([
    ['md:-m-20', 'mt-1', 'h-90/100'],
    ['md:-m-16', 'mt-2', 'h-90/100'],
    ['md:-m-12', 'mt-3', 'h-90/100'],
    ['md:-m-8', 'mt-4', 'h-90/100'],
    ['md:-m-4', 'mt-5', 'h-90/100'],
    middle,
    ['md:m-4', 'mt-1', 'h-90/100'],
    ['md:m-8', 'mt-2', 'h-90/100'],
    ['md:m-12', 'mt-3', 'h-90/100'],
    ['md:m-16', 'mt-4', 'h-90/100'],
    ['md:m-20', 'mt-5', 'h-90/100'],
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
      'w-full md:h-full',
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
  const innerClasses = useMemo<string>(() => {
    const classes: string[] = [];

    if (disabled) {
      classes.push('blur-xs');
    }

    return classes.join(' ');
  }, [disabled]);
  const doRouting = useCallback((result: boolean) => {
    try {
      dialog.handle(result, decisions);
      const nextRoute = dialog.route(result, decisions);
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
  const onAccept = useCallback((value: any = true) => {
    doRouting(value);
  }, [doRouting]);
  const onDecline = useCallback((value: any = false) => {
    doRouting(value);
  }, [doRouting]);

  return <div className={ classes }>
    <DialogComponent onAccept={ onAccept } onDecline={ onDecline } className={ innerClasses } />
  </div>;
}