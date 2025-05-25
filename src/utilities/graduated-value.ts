export type GraduatedValueItem<T> = [startAt: number, value: T];

export class GraduatedValue<T> {
  private values: GraduatedValueItem<T>[] = [];

  add(startingAt: number, value: T) {
    let found = false;

    this.values.forEach((v) => {
      if (v[0] === startingAt) {
        found = true;
        v[1] = value;
      }
    });

    if (found) {
      return;
    }

    this.values.push([startingAt, value]);
    this.values.sort((v1, v2) => {
      return v1[0] - v2[0];
    });
  }

  valueFor(num: number, defaultValue: T): T {
    let value: T | null = defaultValue;

    this.values.forEach((pair) => {
      if (num > pair[0]) {
        value = pair[1];
      }
    });

    return value;
  }
}