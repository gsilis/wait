import type { DialogType } from "../constants/dialog-type";
import type { SequenceFactory } from "./sequence-factory";
import { stories } from "../stories";
import type { Sequence } from "./sequence";

export default function createSequences(
  sequenceFactory: SequenceFactory,
  addDialog: (id: string, dialog: DialogType) => void,
) {
  stories.map(
    (mod) => mod(sequenceFactory)
  ).reduce((sequences: Sequence[], newSequences: Sequence[]): Sequence[] => {
    return [...sequences, ...newSequences];
  }, []).reduce(
    (collection: DialogType[], sequence: Sequence): DialogType[] => {
      return [...collection, ...sequence.sequenceSteps];
    }, []
  ).forEach(
    (dialog: DialogType) => addDialog(dialog.id, dialog)
  );
}