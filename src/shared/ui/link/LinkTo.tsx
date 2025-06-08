import type { JSX, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import {
  PRIMARY_BUTTON_CLASSES,
  NORMAL_BUTTON_CLASSES,
} from '../button/Button';

interface Props {
  label?: string;
  children?: ReactNode;
  external?: boolean;
  href: string;
  description?: string;
  variant?: 'default' | 'primary-button' | 'normal-button';
}

export const LinkTo = ({
  label,
  children,
  href,
  description,
  external = false,
  variant = 'default',
}: Props): JSX.Element => {
  const getClasses = () => {
    switch (variant) {
      case 'primary-button':
        return PRIMARY_BUTTON_CLASSES;
      case 'normal-button':
        return NORMAL_BUTTON_CLASSES;
      default:
        return 'group text-gray-600 hover:text-blue-900 hover:underline transition-colors duration-200 inline-flex items-center gap-1';
    }
  };

  // Use children if provided, otherwise fall back to label
  const content = children || label;

  const linkContent = (
    <>
      <span>{content}</span>
      {external && (
        <ExternalLink
          size={14}
          className="opacity-0 group-hover:opacity-70 transition-opacity duration-200"
        />
      )}
    </>
  );

  return (
    <>
      {external ? (
        <a
          className={getClasses()}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkContent}
        </a>
      ) : (
        <Link className={getClasses()} to={href}>
          {linkContent}
        </Link>
      )}
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
