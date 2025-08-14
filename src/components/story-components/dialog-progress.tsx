import { useCallback, useEffect, useRef, useState } from "react";
import LoadingBarGraphic from "../loading-bar-graphic";
import type { TimedSequence } from "../../core/timed-sequence";
import type { DialogComponentProps } from "../../constants/dialog-type";
import { DialogContent } from "../dialog-content";
import { DialogPrimaryText } from "../dialog-primary-text";

interface DialogProgressProps {
  progressSequence?: TimedSequence<number>,
  labelSequence?: TimedSequence<string>,
}

export function DialogProgress({
  onAccept,
  progressSequence,
  labelSequence,
}: DialogProgressProps & DialogComponentProps) {
  const [progress, setProgress] = useState<number>(0);
  const [label, setLabel] = useState<string>('Loading...');
  const completed = useRef(false);

  const onComplete = useCallback(() => {
    completed.current = true;
    onAccept && onAccept();
  }, [onAccept, completed]);

  useEffect(() => {
    if (!progressSequence || completed.current) return;

    const sub = progressSequence.observe({
      next: (value: number) => {
        setProgress(value);
      },
      complete: onComplete,
      error: onComplete,
    });
    progressSequence.start();

    return () => sub.unsubscribe();
  }, [
    setProgress,
    progressSequence,
    onComplete,
    completed,
  ]);
  useEffect(() => {
    if (!labelSequence || completed.current) return;

    const sub = labelSequence.observe({
      next: (value: string) => {
        setLabel(value);
      },
      complete: () => {},
      error: () => {},
    });
    labelSequence.start();

    return () => sub.unsubscribe();
  }, [
    setLabel,
    labelSequence,
    completed,
  ]);

  return <>
    <DialogContent verticalAlign="center">
      <LoadingBarGraphic progress={ progress } />
      <DialogPrimaryText>
        <p className="text-center">
          { label }
        </p>
      </DialogPrimaryText>
    </DialogContent>
  </>;
};