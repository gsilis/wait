import { BehaviorSubject, Subscription } from 'rxjs';
import { type TimedSequencePart } from './timed-sequence-part';

export class TimedSequence<T> {
  private parts: Array<TimedSequencePart<T>>;
  private value: T;
  private partIndex: number;
  private isRunning: boolean = false;
  private behaviorSubject: BehaviorSubject<T>;
  private subscription?: Subscription;

  constructor(value: T, parts: Array<TimedSequencePart<T>> = []) {
    this.parts = parts;
    this.value = value;
    this.behaviorSubject = new BehaviorSubject(this.value);
    this.partIndex = 0;
  }

  addPart(part: TimedSequencePart<T>): TimedSequence<T> {
    if (this.isRunning) {
      throw new Error('Cannot add part while sequence is running');
    }

    this.parts.push(part);
    return this;
  }

  removePart(part: TimedSequencePart<T>): TimedSequence<T> {
    if (this.isRunning) {
      throw new Error('Cannot remove part while sequence is running');
    }

    this.parts = this.parts.filter(p => p !== part);
    return this;
  }

  start() {
    if (this.isRunning || this.subscription) {
      return;
    }

    this.isRunning = true;
    this.behaviorSubject.next(this.value);
    this.partIndex = 0;
    this.run();
  }

  stop() {
    if (this.isRunning) {
      this.isRunning = false;
    }

    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

  observe(fn: (value: T) => void) {
    return this.behaviorSubject.subscribe(fn);
  }

  reset() {
    this.partIndex = 0;
    this.behaviorSubject = new BehaviorSubject(this.value);
    this.isRunning = false;
  }

  private run() {
    if (this.partIndex >= this.parts.length) {
      if (this.subscription) this.subscription.unsubscribe();
      this.subscription = undefined;
      this.behaviorSubject.complete();
      this.isRunning = false;
      return;
    }

    const part = this.parts[this.partIndex];
    part.subscribe({
      next: this.onProgress,
      error: this.onComplete,
      complete: this.onComplete
    });
  }

  private onProgress(value: T) {
    this.behaviorSubject.next(value);
  }

  private onComplete() {
    this.partIndex++;
    this.run();
  }
}