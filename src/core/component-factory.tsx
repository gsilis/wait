import AlertDialog from "../components/alert-dialog";
import ConfirmDialog from "../components/confirm-dialog";
import { Dialog } from "../components/dialog";
import { DialogPrimaryText } from "../components/dialog-primary-text";
import { DialogSelect } from "../components/dialog-select";
import type { TileSelectOption } from "../components/tile-select";
import type { DialogComponentProps } from "../constants/dialog-type";
import type { ChildrenProps } from "../contexts/support/children-props";

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

    return ({ onAccept, className }: DialogComponentProps) => (
      <AlertDialog
        title={ title }
        accept={ onAccept }
        confirmText={ confirmText }
        confirmTitle={ confirmTitle }
        className={ className }
      >
        <DialogPrimaryText>
          { child }
        </DialogPrimaryText>
      </AlertDialog>
    );
  }

  simpleConfirm(
    title: string,
    message: any,
    confirmText: string,
    cancelText: string,
    confirmTitle?: string,
    cancelTitle?: string
  ): React.FunctionComponent {
    let child;
    if (typeof message === 'function') {
      const Component = message as React.FunctionComponent;
      child = <Component />;
    } else {
      child = <DialogPrimaryText>{ message }</DialogPrimaryText>;
    }

    return ({ onAccept, onDecline, className }: DialogComponentProps) => (
      <ConfirmDialog
        title={ title }
        accept={ onAccept }
        decline={ onDecline }
        confirmText={ confirmText }
        cancelText={ cancelText }
        confirmTitle={ confirmTitle }
        cancelTitle={ cancelTitle }
        className={ className }
      >
        { child }
      </ConfirmDialog>
    );
  }

  simpleSelect(
    title: string,
    options: [title: string, message?: string, id?: string, selected?: boolean][],
    message: string = '',
    confirmText: string = 'Submit',
    confirmTitle: string = '',
    cancelable: boolean = false,
    cancelText: string = '',
    cancelTitle: string = '',
  ) {
    let selectedOption: string | undefined;
    const selectOptions = options.map((option, index): TileSelectOption => {
      if (option[3]) selectedOption = `${index}`;
      const optionId = option[2] || index;
      return { id: `${optionId}`, title: option[0], description: option[1] };
    });

    return ({ onAccept, onDecline, className }: DialogComponentProps) => (
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
        className={ className }
      >
        <DialogPrimaryText>
          { message }
        </DialogPrimaryText>
      </DialogSelect>
    );
  }

  customDialog(
    title: string,
    Component: React.FunctionComponent<DialogComponentProps>,
    properties: Record<any, any> = {},
  ) {
    return ({ onAccept, onDecline, className }: DialogComponentProps) => (
      <Dialog title={ title } className={ className }>
        <Component onAccept={ onAccept } onDecline={ onDecline } { ...properties } />
      </Dialog>
    );
  }

  component(
    Component: React.FunctionComponent<DialogComponentProps & ChildrenProps>,
    properties: Record<any, any> = {},
  ) {
    return ({ onAccept, onDecline, className }: DialogComponentProps) => (
      <Component onAccept={ onAccept } onDecline={ onDecline } className={ className } { ...properties } />
    );
  }

  componentWithChildren(
    Component: React.FunctionComponent<DialogComponentProps & ChildrenProps>,
    children: any,
    properties: Record<any, any> = {},
  ) {
    return ({ onAccept, onDecline, className }: DialogComponentProps) => (
      <Component onAccept={ onAccept } onDecline={ onDecline } className={ className } { ...properties }>{ children }</Component>
    );
  }
}