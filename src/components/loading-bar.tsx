import { useEffect, useMemo, useState } from "react";
import LoadingBarGraphic from "./loading-bar-graphic";

interface LoadingBarProps {
  label?: string,
  onFinished: CallableFunction,
  initialProgress?: number,
  stopAt?: number,
  speed?: number,
}

export default function LoadingBar({
  label = 'Loading',
  onFinished,
  initialProgress = 0,
  stopAt = 100,
  speed = 100,
}: LoadingBarProps) {
  const [progress, setProgress] = useState<number>(initialProgress);

  useEffect(() => {
    // Run every time progress is updated
    setTimeout(() => {
      if (progress < stopAt) {
        setProgress(progress + 1);
      } else if (progress >= stopAt) {
        onFinished();
      }
    }, speed);
  }, [progress, setProgress, speed]);

  useEffect(() => {
    if (progress > stopAt) {
      setProgress(stopAt);
    } else {
      setProgress(progress + 1);
    }
  }, [setProgress, stopAt]);

  const labelClasses = useMemo<string>(() => {
    return [
      'label flex-1 text-xs uppercase',
    ].join(' ');
  }, []);
  

  return <div className="loading-bar flex flex-col place-items-center w-fit">
    <LoadingBarGraphic progress={ progress }></LoadingBarGraphic>
    <span className={ labelClasses }>{ label }</span>
  </div>;
}