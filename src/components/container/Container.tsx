import { type JSX, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Container = ({ children }: Props): JSX.Element => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">{children}</div>
  );
};
