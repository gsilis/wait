import { Component } from "react";
import type { DialogRouter } from "../constants/dialog-type";
import type { Sequence } from "./sequence";
import type { ComponentFactory } from "./component-factory";
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

  message(title: string, message: string | React.FunctionComponent, overrideNextId: string | null = null) {
    const id = this.sequence.nextId();
    const nextId = overrideNextId || this.sequence.nextId(1);
    const dialog = {
      id,
      title,
      component: this.componentFactory.alert(title, message, 'Ok', 'Ok'),
      handle: () => {},
      route: this.messageRouterFor(nextId),
    };

    this.sequence.add(dialog);
  }

  dialog(title: string, component: React.FunctionComponent, overrideNextId: string | null = null) {
    const id = this.sequence.nextId();
    const nextId = overrideNextId || this.sequence.nextId(1);

    if (!this.cancelId) {
      throw new Error(`No cancel id is set.`);
    }

    const dialog = {
      id,
      component,
      route: this.dialogRouterFor(nextId, this.cancelId),
      handle: () => {},
      title,
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
    return (result) => result ? confirmId : cancelId;
  }
}