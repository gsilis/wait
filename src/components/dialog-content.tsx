import type { ChildrenProps } from "../contexts/support/children-props";

interface DialogContentProps {
  verticalAlign?: 'top' | 'center' | 'bottom'
}

export function DialogContent({ children, verticalAlign = 'top' }: DialogContentProps & ChildrenProps) {
  const align = ({
    top: 'content-start',
    center: 'content-center',
    bottom: 'content-end'
  })[verticalAlign] || 'content-start';
  const classes = ['px-3 py-2 flex-1', align];

  return <div className={ classes.join(' ') }>
    { children }
  </div>;
}