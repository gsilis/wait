import AlertDialog from "../components/alert-dialog";
import ConfirmDialog from "../components/confirm-dialog";
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
}