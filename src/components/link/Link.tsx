import type { JSX } from 'react';

interface Props {
  label: string;
  external?: boolean;
  href: string;
}

export const Link = ({ label, href, external = false }: Props): JSX.Element => {
  return (
    <a
      className="text-gray-600"
      href={href}
      target={external ? '_blank' : '_self'}
    >
      {label}
    </a>
  );
};
