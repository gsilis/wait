import { type Observer, Subscription, interval } from "rxjs";
import type { TimedSequencePart } from "./timed-sequence-part";

/**
 * Note: These parts only expect a single subscriber.
 */
export class LinearTimedSequencePart<T extends number> implements TimedSequencePart<T> {
  static create(duration: number, toValue: number, interval: number = 200) {
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

  constructor(duration: number, toValue: T, interval: number = 200) {
    this.duration = duration;
    this.goal = toValue;
    this.interval = interval;
  }

  start(value: T): void {
    if (this.isRunning) return;

    this.value = value;
    this.isRunning = true;
    this.step = Math.abs(this.goal - this.value) / (this.duration / this.interval) as T;
    this.intervalSubscription = interval(this.interval).subscribe(this.onTick);
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
    if (!this.value) {
      throw new Error("The start method must be called before subscribing.");
    }
    
    if (this.observer) {
      throw new Error("This object is only meant to have one subscriber.");
    }

    this.observer = observer;
    this.observer.next(this.value);

    return new Subscription(this.onUnsubscribe.bind(this));
  }

  private onTick() {
    if (!this.value || !this.observer) {
      return;
    }

    const currentValue = this.value as number;
    this.value = (currentValue + this.step) as T;
    this.observer!.next(this.value!);

    if (this.value >= this.goal) {
      this.observer.complete();
    }
  }

  private onUnsubscribe() {
    this.stop();
  }
}