import type { ComponentFactory } from "./component-factory";
import { DialogFactory } from "./dialog-factory";
import { Sequence } from "./sequence";
import type { SideEffectHandlerFactory } from "./side-effect-handler-factory";

type SequenceFactoryExecutor = (dialogFactory: DialogFactory, sideEffect: SideEffectHandlerFactory, componentFactory: ComponentFactory) => void;

export class SequenceFactory {
  private componentFactory: ComponentFactory;
  private sideEffectHandlerFactory: SideEffectHandlerFactory;

  constructor(
    componentFactory: ComponentFactory,
    sideEffectHandlerFactory: SideEffectHandlerFactory
  ) {
    this.componentFactory = componentFactory;
    this.sideEffectHandlerFactory = sideEffectHandlerFactory;
  }

  create(name: string, executor: SequenceFactoryExecutor): Sequence {
    const sequence = new Sequence(name);
    const dialogFactory = new DialogFactory(this.componentFactory, sequence);

    try {
      executor(dialogFactory, this.sideEffectHandlerFactory, this.componentFactory);
    } catch (err) {
      console.group('SequenceFactory');
      console.error(`Sequence factory executor threw an error.`);
      console.error(err);
      console.groupEnd();
    }

    return sequence;
  }
}