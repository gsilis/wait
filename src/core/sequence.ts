import type { DialogType } from "../constants/dialog-type";

export class Sequence {
  private steps: DialogType[] = [];
  private name: string;

  constructor(
    name: string,
  ) {
    this.name = name;
  }

  add(dialog: DialogType) {
    this.steps.push(dialog);
  }

  nextId(addOffset: number = 0): string {
    const combinedId = this.steps.length + addOffset;

    if (combinedId === 0) {
      return this.name;
    } else {
      return `${this.name}-${combinedId}`;
    }
  }

  get sequenceSteps(): DialogType[] {
    return this.steps;
  }
}