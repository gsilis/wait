import type { DialogHandler, DialogRouter, DialogType } from "../constants/dialog-type";
import type { Sequence } from "./sequence";
import type { ComponentFactory } from "./component-factory";

type StringOrComponent = string | React.FunctionComponent;

/**
 * The dialog factory needs to supply the "next" id
 * to the currently called 'message' call.
 */
export class DialogFactory {
  private componentFactory: ComponentFactory;
  private sequence: Sequence;
  private cancelId?: string;

  constructor(componentFactory: ComponentFactory, sequence: Sequence) {
    this.componentFactory = componentFactory;
    this.sequence = sequence;
  }

  message(
    title: string,
    message: StringOrComponent,
    confirmText: string = 'Ok',
    confirmTitle: string = '',
    overrideNextId: string | null = null
  ): void {
    const id = this.sequence.nextId();
    const nextId = overrideNextId || this.sequence.nextId(1);
    const dialog = {
      id,
      title,
      component: this.componentFactory.simpleAlert(title, message, confirmText, confirmTitle),
      handle: () => {},
      route: this.messageRouterFor(nextId),
    };

    this.sequence.add(dialog);
  }

  dialog(
    title: string,
    message: StringOrComponent,
    confirmText: string = 'Ok',
    cancelText: string = 'Cancel',
    confirmTitle: string = '',
    cancelTitle: string = '',
    overrideNextId: string | null = null
  ) {
    const id = this.sequence.nextId();
    const nextId = overrideNextId || this.sequence.nextId(1);

    if (!this.cancelId) {
      throw new Error(`No cancel id is set.`);
    }

    const dialog: DialogType = {
      id,
      title,
      component: this.componentFactory.simpleConfirm(title, message, confirmText, cancelText, confirmTitle, cancelTitle),
      route: this.dialogRouterFor(nextId, this.cancelId),
      handle: () => {},
    };

    this.sequence.add(dialog);
  }

  custom(
    title: string,
    component: React.FunctionComponent,
    overrideNextId: string | null = null,
    cancelable: boolean = false,
    handler: DialogHandler,
  ) {
    const id = this.sequence.nextId();
    const nextId = overrideNextId || this.sequence.nextId(1);

    if (cancelable && !this.cancelId) {
      throw new Error(`No cancel id is set.`);
    }

    let router;
    if (cancelable && this.cancelId) {
      router = this.dialogRouterFor(nextId, this.cancelId);
    } else {
      router = this.messageRouterFor(nextId);
    }

    const dialog: DialogType = {
      id,
      title,
      component,
      route: router,
      handle: handler,
    };

    this.sequence.add(dialog);
  }

  dialogWithSideEffect(
    title: string,
    message: StringOrComponent,
    handler: DialogHandler,
    confirmText: string = 'Ok',
    cancelText: string = 'Cancel',
    confirmTitle: string = '',
    cancelTitle: string = '',
    overrideNextId: string | null = null
  ) {
    const id = this.sequence.nextId();
    const nextId = overrideNextId || this.sequence.nextId(1);

    if (!this.cancelId) {
      throw new Error('No cancel id is set.');
    }

    const dialog: DialogType = {
      id,
      component: this.componentFactory.simpleConfirm(title, message, confirmText, cancelText, confirmTitle, cancelTitle),
      route: this.dialogRouterFor(nextId, this.cancelId),
      handle: handler,
      title,
    };

    this.sequence.add(dialog);
  }

  selectWithSideEffect(
    title: string,
    handler: DialogHandler,
    message: string = '',
    options: [title: string, message?: string, id?: string, selected?: boolean][] = [],
    confirmText: string = 'Submit',
    confirmTitle: string = '',
    cancelable: boolean = false,
    cancelText: string = '',
    cancelTitle: string = '',
    overrideNextId: string | null = null
  ) {
    const id = this.sequence.nextId();
    const nextId = overrideNextId || this.sequence.nextId(1);
    let router: DialogRouter;

    if (cancelable && !this.cancelId) {
      throw new Error('No cancel id is set.');
    } else if (cancelable && this.cancelId) {
      router = this.dialogRouterFor(nextId, this.cancelId);
    } else {
      router = this.messageRouterFor(nextId);
    }

    const dialog: DialogType = {
      id,
      title,
      component: this.componentFactory.simpleSelect(title, options, message, confirmText, confirmTitle, cancelable, cancelText, cancelTitle),
      route: router,
      handle: handler,
    };

    this.sequence.add(dialog);
  }

  cancel(id: string): void {
    this.cancelId = id;
  }

  private messageRouterFor(confirmId: string): DialogRouter {
    return () => confirmId;
  }

  private dialogRouterFor(confirmId: string, cancelId: string): DialogRouter {
    return (result) => {
      return result ? confirmId : cancelId
    };
  }
}