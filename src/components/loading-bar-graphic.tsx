import { useMemo } from "react";

export default function LoadingBarGraphic({
  progress,
}: {
  progress: number,
}) {
  const barWidth = { width: `${progress}%` };

  const classes = useMemo<string>(() => {
    return [
      'border-slate-500',
      'bar-wrapper',
      'w-80',
      'p-0.5',
      'border-1',
      'flex-1',
      'flex',
      'place-items-start',
      'mb-2',
      'w-full'
    ].join(' ');
  }, []);
  const barClasses = useMemo<string>(() =>{
    return [
      'bg-slate-500',
      'bar',
      'h-3',
      'transition-all',
      'duration-100',
    ].join(' ');
  }, []);

  return <span className={ classes }>
    <span className={ barClasses } style={ barWidth }></span>
  </span>;
}