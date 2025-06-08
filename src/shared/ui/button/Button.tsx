import type { ButtonHTMLAttributes, ReactNode } from 'react';

export const PRIMARY_BUTTON_CLASSES =
  'bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors';
export const NORMAL_BUTTON_CLASSES =
  'bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'normal' | 'ghost';
  children: ReactNode;
}

const Button = ({
  variant = 'normal',
  children,
  className = '',
  ...props
}: ButtonProps) => {
  const baseClasses =
    'px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: PRIMARY_BUTTON_CLASSES,
    normal: NORMAL_BUTTON_CLASSES,
    ghost: 'text-gray-700 hover:text-blue-600 focus:ring-blue-500',
  };

  const combinedClasses =
    `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
