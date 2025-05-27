import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { DialogComponentProps } from "../../constants/dialog-type";
import type { ChildrenProps } from "../../contexts/support/children-props";
import { DialogContent } from "../dialog-content";
import { DialogFooter } from "../dialog-footer";
import { PrimaryButton } from "../primary-button";
import LoadingBarGraphic from "../loading-bar-graphic";
import { Subscription, timer } from 'rxjs';
import { GraduatedValue } from "../../utilities/graduated-value";
import { DialogSecondaryText } from "../dialog-secondary-text";

const second = 1000;
const speed = 200;

interface ClickNSeconds {
  seconds?: number,
  clickNSecondsMessages?: GraduatedValue<string>,
}

export function ClickNSeconds({
  children,
  seconds = 1,
  clickNSecondsMessages = new GraduatedValue<string>(),
  onAccept,
}: DialogComponentProps & ChildrenProps & ClickNSeconds) {
  const [progress, setProgress] = useState<number>(0);
  const [pressing, setPressing] = useState<boolean>(false);
  const [resets, setResets] = useState<number>(0);
  const isDone = progress === 100;

  const onMouseUp = useCallback(() => {
    setPressing(false);

    if (!isDone) {
      setResets(r => r + 1);
    }
  }, [setPressing, isDone]);
  const onMouseDown = useCallback(() => {
    setPressing(true);
  }, [setPressing]);
  const onClick = useCallback(() => {
    if (!isDone) {
      return;
    }

    onAccept && onAccept();
  }, [isDone]);
  const tick = useMemo<number>(() => {
    return 100 / (seconds * (second / speed));
  }, [seconds]);
  useEffect(() => {
    let sub: Subscription;

    if (pressing) {
      sub = timer(0, speed).subscribe(() => {
        setProgress((p) => {
          const newProgress = Math.min(100, Math.round(p + tick));

          if (newProgress === 100) {
            sub && sub.unsubscribe();
          }

          return newProgress;
        });
      });
    } else {
      setProgress(currentProgress => {
        return currentProgress === 100 ? 100 : 0;
      });
    }

    return () => {
      sub && sub.unsubscribe();
    };
  }, [
    pressing,
    seconds,
    setProgress,
    tick,
  ]);

  return <>
    <DialogContent>
      { children }
      <LoadingBarGraphic progress={ progress } />
      <DialogSecondaryText>{ clickNSecondsMessages.valueFor(resets, '') }</DialogSecondaryText>
    </DialogContent>
    <DialogFooter>
      <PrimaryButton
        onClick={ onClick }
        onMouseUp={ onMouseUp }
        onMouseDown={ onMouseDown }
      >
        { isDone ? 'Ok' : 'Click to hold' }
      </PrimaryButton>
    </DialogFooter>
  </>;
}