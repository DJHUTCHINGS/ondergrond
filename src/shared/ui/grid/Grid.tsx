import type { JSX, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  columns: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export const Grid = ({ children, columns }: Props): JSX.Element => {
  const gridCols = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
    6: 'md:grid-cols-6',
  } as const;

  return (
    <div className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-8`}>
      {children}
    </div>
  );
};
