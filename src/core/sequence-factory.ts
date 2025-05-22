import type { ComponentFactory } from "./component-factory";
import { DialogFactory } from "./dialog-factory";
import { Sequence } from "./sequence";

type SequenceFactoryExecutor = (dialogFactory: DialogFactory) => void;

export class SequenceFactory {
  private componentFactory: ComponentFactory;

  constructor(componentFactory: ComponentFactory) {
    this.componentFactory = componentFactory;
  }

  create(name: string, executor: SequenceFactoryExecutor): Sequence {
    const sequence = new Sequence(name);
    const dialogFactory = new DialogFactory(this.componentFactory, sequence);

    try {
      executor(dialogFactory);
    } catch (err) {
      console.group('SequenceFactory');
      console.error(`Sequence factory executor threw an error.`);
      console.error(err);
      console.groupEnd();
    }

    return sequence;
  }
}