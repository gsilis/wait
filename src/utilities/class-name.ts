export function classNames(...names: any[]): string {
  return names.filter((name: any) => {
    return typeof name === 'string' && Boolean(name);
  }).join(' ');
}