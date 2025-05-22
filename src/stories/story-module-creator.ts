import type { Sequence } from "../core/sequence";
import type { SequenceFactory } from "../core/sequence-factory";

export type StoryModuleCreator = (sf: SequenceFactory) => Sequence[];