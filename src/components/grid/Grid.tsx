import type { JSX, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  columns: number;
}

export const Grid = ({ children, columns }: Props): JSX.Element => {
  return <div className={`grid md:grid-cols-${columns} gap-8`}>{children}</div>;
};
