import { Subscription, type Observer, interval, take } from "rxjs";
import type { TimedSequencePart } from "./timed-sequence-part";

export class StaticTimedSequencePart<T> implements TimedSequencePart<T> {
  static create<T>(duration: number, value: T) {
    return new StaticTimedSequencePart<T>(duration, value);
  }

  private isRunning: boolean = false;
  private value?: T;
  private duration?: number;
  private observer?: Observer<T>;
  private intervalSubscription?: Subscription;

  constructor(duration: number, value: T) {
    this.duration = duration;
    this.value = value;
  }

  // The value is ignored here because it's a static value object.
  start(_value: T) {
    if (!this.observer) {
      throw new Error("No subscriber is present.");
    }
    if (this.isRunning) return;

    this.isRunning = true;
    this.intervalSubscription = interval(this.duration).pipe(take(1)).subscribe(this.onComplete.bind(this));
    this.observer.next(this.value!);
  }

  stop() {
    if (!this.isRunning) return;
    if (this.intervalSubscription) this.intervalSubscription.unsubscribe();

    this.intervalSubscription = undefined;
    this.isRunning = false;
  }

  subscribe(observer: Observer<T>): Subscription {
    if (this.observer) {
      console.warn("This object is only meant to have a single subscriber.");
    }

    this.observer = observer;
    return new Subscription(this.onUnsubscribe.bind(this));
  }

  private onComplete() {
    if (!this.observer) {
      throw new Error("There is no registered observer.");
    }

    if (this.intervalSubscription) this.intervalSubscription.unsubscribe();
    this.observer.complete();
  }

  private onUnsubscribe() {
    this.stop();
  }
}