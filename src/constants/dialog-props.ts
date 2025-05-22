export interface DialogProps {
  title: string,
}

export interface ConfirmDialog extends DialogProps {
  accept: CallableFunction,
  reject: CallableFunction,
}