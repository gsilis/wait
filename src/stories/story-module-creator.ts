import type { ComponentFactory } from "../core/component-factory";
import type { Sequence } from "../core/sequence";
import type { SequenceFactory } from "../core/sequence-factory";
import type { SideEffectHandlerFactory } from "../core/side-effect-handler-factory";

export type StoryModuleCreator = (
  sf: SequenceFactory,
  se: SideEffectHandlerFactory,
  cf: ComponentFactory
) => Sequence[];