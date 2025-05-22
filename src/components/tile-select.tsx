import { use, useMemo } from "react";
import { DialogTextContext } from "../contexts/dialog-text-context";

export type TileProps = {
  id: string,
  title: string,
  description?: any,
  onSelect: CallableFunction,
  selected?: boolean,
};

export function Tile({
  id,
  title,
  description = '',
  onSelect,
  selected = false
}: TileProps) {
  const textContext = use(DialogTextContext);
  const classes = useMemo<string>(() => {
    const c: string[] = [
      'flex',
      'flex-col',
      'gap-1',
      'align-start',
      'min-h-15',
      'border-1',
      'hover:border-slate-400',
      'dark:hover:border-slate-700',
      'py-3 px-5',
      'bg-linear-to-b',
      'hover:from-slate-100',
      'hover:to-slate-200',
      'dark:hover:from-slate-700',
      'dark:hover:to-slate-800',
      'justify-center',
      'rounded-md',
      'hover:cursor-pointer'
    ];

    if (selected) {
      c.push(
        'border-slate-950',
        'dark:border-slate-100',
        'from-slate-50 to-slate-100',
        'dark:from-slate-800 dark:to-slate-900'
      );
    } else {
      c.push(
        'border-slate-300',
        'dark:border-slate-800',
        'from-slate-200',
        'to-slate-300',
        'dark:from-slate-800',
        'dark:to-slate-900',
      );
    }

    return c.join(' ');
  }, [selected]);

  return <div className={ classes } onClick={ () => onSelect(id) }>
    <p className={ ['font-bold text-md', textContext.primaryTextClasses].join(' ') }>{ title }</p>
    { description && <p className={ ['text-sm', textContext.secondaryTextClasses].join(' ') }>{ description }</p> }
  </div>;
}

export type TileSelectOption = { id: string, title: string, description?: string };

export type TileSelectProps = {
  options: TileSelectOption[],
  onSelect: CallableFunction,
  selected?: string,
};

export function TileSelect({
  options,
  onSelect,
  selected,
}: TileSelectProps) {
  return <div className="flex flex-col gap-2 w-full p-2">
    {
      options.map((option, key) => (
        <Tile
          key={ key }
          id={ option.id }
          title={ option.title }
          description={ option.description }
          onSelect={ onSelect }
          selected={ selected === option.id }
        />
      ))
    }
  </div>;
}