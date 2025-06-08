import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button, {
  PRIMARY_BUTTON_CLASSES,
  NORMAL_BUTTON_CLASSES,
} from './Button';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Button>Click me</Button>);
      expect(
        screen.getByRole('button', { name: 'Click me' })
      ).toBeInTheDocument();
    });

    it('renders with complex children', () => {
      render(
        <Button>
          <span>Icon</span> Click me
        </Button>
      );
      expect(screen.getByRole('button')).toHaveTextContent('Icon Click me');
    });
  });

  describe('Variants', () => {
    it('applies default (normal) variant classes', () => {
      render(<Button>Default</Button>);
      const button = screen.getByRole('button');

      // Should have base classes and normal variant classes
      expect(button).toHaveClass(
        'px-6',
        'py-3',
        'rounded-lg',
        'font-medium',
        'transition-colors'
      );
      expect(button).toHaveClass(
        'bg-gray-200',
        'text-gray-700',
        'hover:bg-gray-300'
      );
    });

    it('applies primary variant classes', () => {
      render(<Button variant="primary">Primary</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveClass(
        'bg-blue-600',
        'text-white',
        'hover:bg-blue-700'
      );
    });

    it('applies normal variant classes explicitly', () => {
      render(<Button variant="normal">Normal</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveClass(
        'bg-gray-200',
        'text-gray-700',
        'hover:bg-gray-300'
      );
    });

    it('applies ghost variant classes', () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveClass(
        'text-gray-700',
        'hover:text-blue-600',
        'focus:ring-blue-500'
      );
      expect(button).not.toHaveClass('bg-blue-600', 'bg-gray-200');
    });
  });

  describe('Custom className', () => {
    it('merges custom className with variant classes', () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveClass('custom-class');
      expect(button).toHaveClass('bg-gray-200'); // Still has variant classes
    });

    it('handles empty className gracefully', () => {
      render(<Button className="">Empty Class</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveClass('bg-gray-200'); // Still works normally
    });
  });

  describe('HTML Button Props', () => {
    it('passes through onClick handler', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('passes through disabled prop', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');

      expect(button).toBeDisabled();
    });

    it('passes through type prop', () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('type', 'submit');
    });

    it('passes through aria attributes', () => {
      render(<Button aria-label="Custom label">Button</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-label', 'Custom label');
    });

    it('passes through data attributes', () => {
      render(<Button data-testid="custom-button">Button</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('data-testid', 'custom-button');
    });
  });

  describe('Focus States', () => {
    it('has focus ring classes', () => {
      render(<Button>Focusable</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveClass(
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-offset-2'
      );
    });
  });

  describe('Exported Classes', () => {
    it('exports PRIMARY_BUTTON_CLASSES constant', () => {
      expect(PRIMARY_BUTTON_CLASSES).toBe(
        'bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors'
      );
    });

    it('exports NORMAL_BUTTON_CLASSES constant', () => {
      expect(NORMAL_BUTTON_CLASSES).toBe(
        'bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors'
      );
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined variant gracefully', () => {
      // TypeScript won't allow this, but testing runtime behavior
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render(<Button variant={undefined as any}>Undefined</Button>);
      const button = screen.getByRole('button');

      // Should default to normal variant
      expect(button).toHaveClass('bg-gray-200');
    });

    it('handles multiple custom classes', () => {
      render(<Button className="class1 class2 class3">Multiple</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveClass('class1', 'class2', 'class3');
    });
  });
});
