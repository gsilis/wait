import { useMemo } from "react";
import type { DialogProps } from "../constants/dialog-props";
import type { ChildrenProps } from "../contexts/support/children-props";
import { TimedSequence } from "../core/timed-sequence";
import { LinearTimedSequencePart } from "../core/linear-timed-sequence-part";
import { StaticTimedSequencePart } from "../core/static-timed-sequence-part";
import { DialogProgress } from "./story-components/dialog-progress";
import { DialogContent } from "./dialog-content";
import { DialogTitle } from "./dialog-title";
import { Dialog } from "./dialog";

export interface ProgressDialogInterface extends DialogProps, ChildrenProps {
  accept?: CallableFunction,
  className?: string,
  duration: number,
  messages: string | string[],
}

export default function ProgressDialog({
  title,
  accept,
  className,
  duration,
  messages,
}: ProgressDialogInterface) {
  const progress = useMemo<TimedSequence<number>>(() => {
    const sequence = new TimedSequence(0);
    sequence.addPart(LinearTimedSequencePart.create(duration, 100));
    return sequence;
  }, [duration]);
  const label = useMemo<TimedSequence<string>>(() => {
    const sequence = new TimedSequence<string>('');
    const labels = [];

    if (typeof messages === 'string') {
      labels.push(messages);
    } else {
      labels.push(...messages);
    }

    const messageDuration = duration / labels.length;

    labels.forEach((label) => {
      sequence.addPart(StaticTimedSequencePart.create(messageDuration, label));
    });

    return sequence;
  }, [duration, messages]);

  return <Dialog title={ title }>
    <DialogContent verticalAlign="center">
      <DialogProgress 
        onAccept={ accept }
        progressSequence={ progress }
        labelSequence={ label }
        className={ className }
      ></DialogProgress>
    </DialogContent>
  </Dialog>;
}