import { type Observer, Subscription, interval } from "rxjs";
import type { TimedSequencePart } from "./timed-sequence-part";

const defaultTickSpeed = 20;

/**
 * Note: These parts only expect a single subscriber.
 */
export class LinearTimedSequencePart<T extends number> implements TimedSequencePart<T> {
  static create(duration: number, toValue: number, interval: number = defaultTickSpeed) {
    return new LinearTimedSequencePart<number>(duration, toValue, interval);
  }

  private step: T = 0 as T;
  private goal: T;
  private value?: T;
  private isRunning: boolean = false;
  private observer?: Observer<T>;
  private duration: number;
  private interval: number;
  private intervalSubscription?: Subscription;

  constructor(duration: number, toValue: T, interval: number = defaultTickSpeed) {
    this.duration = duration;
    this.goal = toValue;
    this.interval = interval;
  }

  start(value: T): void {
    if (this.isRunning) return;
    if (!this.observer) {
      throw new Error('No subscriber present!');
    }

    this.value = value;
    this.isRunning = true;
    this.step = Math.abs(this.goal - this.value) / (this.duration / this.interval) as T;
    this.intervalSubscription = interval(this.interval).subscribe(this.onTick.bind(this));
    this.observer.next(value);
  }

  stop() {
    if (!this.isRunning) return;
    if (this.intervalSubscription) this.intervalSubscription.unsubscribe();

    this.intervalSubscription = undefined;
    this.isRunning = false;
    this.value = 0 as T;
    this.step = 0 as T;
  }

  subscribe(observer: Observer<T>): Subscription {
    if (this.observer) {
      throw new Error("This object is only meant to have one subscriber.");
    }

    this.observer = observer;

    return new Subscription(this.onUnsubscribe.bind(this));
  }

  private onTick() {
    if (this.value === undefined || !this.observer) {
      return;
    }

    const currentValue = this.value as number;
    this.value = (currentValue + this.step) as T;
    this.observer!.next(this.value!);

    if (this.value >= this.goal) {
      this.observer.complete();
      this.stop();
    }
  }

  private onUnsubscribe() {
    this.stop();
  }
}