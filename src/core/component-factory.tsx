import AlertDialog from "../components/alert-dialog";
import ConfirmDialog from "../components/confirm-dialog";
import { DialogSelect } from "../components/dialog-select";
import type { TileSelectOption } from "../components/tile-select";
import type { DialogComponentProps } from "../constants/dialog-type";

export class ComponentFactory {
  simpleAlert(
    title: string,
    message: any,
    confirmText: string,
    confirmTitle?: string
  ): React.FunctionComponent {
    let child;
    if (typeof message === 'function') {
      const Component = message as React.FunctionComponent;
      child = <Component />;
    } else {
      child = message;
    }

    return ({ onAccept }: DialogComponentProps) => (
      <AlertDialog
        title={ title }
        accept={ onAccept }
        confirmText={ confirmText }
        confirmTitle={ confirmTitle }
      >
        { child }
      </AlertDialog>
    );
  }

  simpleConfirm(
    title: string,
    message: any,
    confirmText: string,
    cancelText: string,
    confirmTitle?: string,
    cancelTitle?: string,
  ): React.FunctionComponent {
    let child;
    if (typeof message === 'function') {
      const Component = message as React.FunctionComponent;
      child = <Component />;
    } else {
      child = message;
    }

    return ({ onAccept, onDecline }: DialogComponentProps) => (
      <ConfirmDialog
        title={ title }
        accept={ onAccept }
        decline={ onDecline }
        confirmText={ confirmText }
        cancelText={ cancelText }
        confirmTitle={ confirmTitle }
        cancelTitle={ cancelTitle }
      >
        { child }
      </ConfirmDialog>
    );
  }

  simpleSelect(
    title: string,
    options: [title: string, message?: string, selected?: boolean][],
    message: string = '',
    confirmText: string = 'Submit',
    confirmTitle: string = '',
    cancelable: boolean = false,
    cancelText: string = '',
    cancelTitle: string = ''
  ) {
    let selectedOption: string | undefined;
    const selectOptions = options.map((option, index): TileSelectOption => {
      if (option[2]) selectedOption = `${index}`;
      return { id: `${index}`, title: option[0], description: option[1] };
    });

    return ({ onAccept, onDecline }: DialogComponentProps) => (
      <DialogSelect
        title={ title }
        confirmText={ confirmText }
        confirmTitle={ confirmTitle }
        cancelText={ cancelText }
        cancelTitle={ cancelTitle }
        cancelable={ cancelable }
        options={ selectOptions }
        selected={ selectedOption }
        accept={ onAccept }
        decline={ onDecline }
      >
        { message }
      </DialogSelect>
    );
  }
}