import type { JSX } from 'react';
import { ExternalLink } from 'lucide-react';

interface Props {
  label: string;
  external?: boolean;
  href: string;
  description?: string;
}

export const LinkTo = ({
  label,
  href,
  description,
  external = false,
}: Props): JSX.Element => {
  return (
    <>
      <a
        className="group text-gray-600 hover:text-blue-900 hover:underline transition-colors duration-200 inline-flex items-center gap-1"
        href={href}
        target={external ? '_blank' : '_self'}
      >
        <span>{label}</span>
        {external && (
          <ExternalLink
            size={14}
            className="opacity-0 group-hover:opacity-70 transition-opacity duration-200"
          />
        )}
      </a>
      {description && description?.length > 0 && (
        <div className="-mt-2">
          <small>
            <em>{description}</em>
          </small>
        </div>
      )}
    </>
  );
};
