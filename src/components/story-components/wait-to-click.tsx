import { useCallback, useEffect, useState, type ReactElement } from "react";
import type { DialogComponentProps } from "../../constants/dialog-type";
import { DialogFooter } from "../dialog-footer";
import { PrimaryButton } from "../primary-button";
import type { ChildrenProps } from "../../contexts/support/children-props";
import { DialogContent } from "../dialog-content";
import { timer } from "rxjs";
import { DialogPrimaryText } from "../dialog-primary-text";

const messages = [
  ``,
  `Let's leave the button alone until your time out is over.`,
  `Let's LEAVE the button ALONE until your time out is over.`,
  `You're only hurting yourself by doing this!`,
  `Do we need to turn the button off?`,
  `We'll turn it off...`,
  `We'll do it...`,
  `Or maybe we'll just make time out longer.`,
  `Want to make it longer?`,
  `Is that what you really want?`,
  `Ok fine.`,
  `Want it to be even longer?`,
  `There's just no winning with you.`,
  `Grow up!`,
  `You would have been done with this by now.`,
  'Seriously?',
  'Seriously??',
  'Seriously!??',
  'Ugh..',
];

export function WaitToClick({ onAccept, children, timeOut = 0 }: DialogComponentProps & ChildrenProps & { timeOut?: number }) {
  const [lastClick, setLastClick] = useState<number>(Date.now());
  const [speedIncreased, setSpeedIncreased] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(200);
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const isComplete = progress >= 100;
  const go = useCallback(() => {
    if (isComplete) {
      onAccept && onAccept();
    } else {
      setLastClick(Date.now());
      setMessageIndex(index => index += 1);

      if (messageIndex > 0 && messageIndex % 10 === 0) {
        setSpeed(speed => speed * 1.5);
      }
    }
  }, [
    onAccept,
    isComplete,
    setLastClick,
    setMessageIndex,
    messageIndex,
  ]);
  const onIncreaseSpeed = useCallback(() => {
    if (!speedIncreased) {
      setSpeedIncreased(true);
      setSpeed(speed => speed / 10);
      setTimeout(() => setProgress(51));
    }
  }, [setSpeed, setSpeedIncreased, speedIncreased]);

  useEffect(() => {
    const sub = timer(0, speed).subscribe(() => {
      setProgress((progress) => {
        const newValue = Math.min(progress + 1, 100);
        
        if (newValue >= 100) {
          sub.unsubscribe();
        }

        return newValue;
      });
    });

    return () => {
      sub.unsubscribe();
      setProgress(0);
    }
  }, [
    lastClick,
    setProgress,
    timeOut,
    speed,
  ]);

  const remaining = Math.round(((100 - progress) * speed) / 1000);
  let message: ReactElement | string = '';
  if (messages[messageIndex]) {
    message = <DialogPrimaryText>{ messages[messageIndex] }</DialogPrimaryText>;
  } else if (messageIndex > 0) {
    message = <>
      <DialogPrimaryText>You've already reset { messageIndex } times...</DialogPrimaryText>
      <DialogPrimaryText>You now have to wait { remaining } seconds...</DialogPrimaryText>
      {
        messageIndex > 60 && <DialogPrimaryText>
          { progress < 10 && `You know there's no prize for clicking...` }
          { progress >= 10 && progress < 20 && `Looks like you're calming down...` }
          { progress >= 20 && progress <= 50 && `That's good. Nice and calm...` }
        </DialogPrimaryText>
      }
      { messageIndex > 60 && (progress > 50 || speedIncreased ) && <DialogPrimaryText>Have you learned your lesson? <PrimaryButton onClick={ onIncreaseSpeed } disabled={ speedIncreased || isComplete } title={ speedIncreased ? `One per customer...` : '' }>Reduce Time</PrimaryButton></DialogPrimaryText> }
    </>
  }

  return <>
    <DialogContent>
      { children }
      { message && !isComplete && message }
    </DialogContent>
    <DialogFooter>
      <PrimaryButton onClick={ go } progress={ progress } title={ isComplete ? `Ok you can continue` : `Don't click during time out - ${progress}%` }>{ isComplete ? 'OK' : 'Wait...' }</PrimaryButton>
    </DialogFooter>
  </>;
}