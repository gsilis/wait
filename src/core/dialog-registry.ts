import type { DialogType } from "../constants/dialog-type";

export class DialogRegistry {
  private registry: Record<string, DialogType> = {};

  register(id: string, dialog: DialogType) {
    if (this.registry[id]) {
      throw new Error(`Duplicate dialog registered at '${id}'.`);
    }

    this.registry[id] = dialog;
  }

  dialogFor(id: string): DialogType {
    const setting = this.registry[id];

    if (!setting) {
      throw new Error(`No dialog registered at '${id}'.`);
    }

    return setting;
  }
}