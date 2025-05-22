export default class OffsetCalculator {
  private steps: any[][];
  private initialOffset: number;

  constructor(
    steps: any[][],
    initialStep: any[] = [],
  ) {
    this.steps = steps;
    this.initialOffset = this.steps.indexOf(initialStep);
    this.initialOffset = this.initialOffset > -1 ? this.initialOffset : 0;
  }

  valuesFor(index: number) {
    const lookup = this.initialOffset + index;
    const lookupIndex = lookup % this.steps.length;

    return this.steps[lookupIndex];
  }
}