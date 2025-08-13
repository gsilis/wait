import type { Subscription, Observer } from "rxjs";

/**
 * Note: These parts only expect a single subscriber.
 */
export interface TimedSequencePart<T> {
  start(value: T): void;
  stop(): void;
  subscribe(observer: Observer<T>): Subscription;
}