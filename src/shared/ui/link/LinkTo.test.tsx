import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { LinkTo } from './LinkTo';

// Wrapper component to provide router context for internal links
const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('LinkTo Component', () => {
  describe('Content Rendering', () => {
    it('renders with label prop', () => {
      render(
        <RouterWrapper>
          <LinkTo href="/test" label="Test Link" />
        </RouterWrapper>
      );
      expect(
        screen.getByRole('link', { name: 'Test Link' })
      ).toBeInTheDocument();
    });

    it('renders with children instead of label', () => {
      render(
        <RouterWrapper>
          <LinkTo href="/test">Children Content</LinkTo>
        </RouterWrapper>
      );
      expect(
        screen.getByRole('link', { name: 'Children Content' })
      ).toBeInTheDocument();
    });

    it('prioritizes children over label when both provided', () => {
      render(
        <RouterWrapper>
          <LinkTo href="/test" label="Label Text">
            Children Text
          </LinkTo>
        </RouterWrapper>
      );
      expect(
        screen.getByRole('link', { name: 'Children Text' })
      ).toBeInTheDocument();
      expect(screen.queryByText('Label Text')).not.toBeInTheDocument();
    });

    it('renders complex children content', () => {
      render(
        <RouterWrapper>
          <LinkTo href="/test">
            <span>Icon</span> Complex Content
          </LinkTo>
        </RouterWrapper>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveTextContent('Icon Complex Content');
    });
  });

  describe('Internal Links (React Router)', () => {
    it('renders React Router Link for internal URLs', () => {
      render(
        <RouterWrapper>
          <LinkTo href="/internal" label="Internal Link" />
        </RouterWrapper>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/internal');
      expect(link).not.toHaveAttribute('target');
    });

    it('applies default classes to internal links', () => {
      render(
        <RouterWrapper>
          <LinkTo href="/test" label="Test" />
        </RouterWrapper>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveClass(
        'group',
        'text-gray-600',
        'hover:text-blue-900',
        'hover:underline',
        'transition-colors',
        'duration-200',
        'inline-flex',
        'items-center',
        'gap-1'
      );
    });

    it('does not show external icon for internal links', () => {
      render(
        <RouterWrapper>
          <LinkTo href="/internal" label="Internal" />
        </RouterWrapper>
      );
      // ExternalLink icon should not be present
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
  });

  describe('External Links', () => {
    it('renders regular anchor tag for external URLs', () => {
      render(
        <LinkTo href="https://example.com" label="External Link" external />
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('shows external icon for external links', () => {
      render(<LinkTo href="https://example.com" label="External" external />);
      const icon = screen.getByRole('link').querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('opacity-0', 'group-hover:opacity-70');
    });

    it('applies correct security attributes to external links', () => {
      render(<LinkTo href="https://example.com" label="External" external />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  describe('Variants', () => {
    it('applies default variant classes', () => {
      render(
        <RouterWrapper>
          <LinkTo href="/test" label="Default" variant="default" />
        </RouterWrapper>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveClass('text-gray-600', 'hover:text-blue-900');
    });

    it('applies primary-button variant classes', () => {
      render(
        <RouterWrapper>
          <LinkTo
            href="/test"
            label="Primary Button"
            variant="primary-button"
          />
        </RouterWrapper>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveClass(
        'bg-blue-600',
        'text-white',
        'px-6',
        'py-3',
        'rounded-lg',
        'font-medium',
        'hover:bg-blue-700'
      );
    });

    it('applies normal-button variant classes', () => {
      render(
        <RouterWrapper>
          <LinkTo href="/test" label="Normal Button" variant="normal-button" />
        </RouterWrapper>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveClass(
        'bg-gray-200',
        'text-gray-700',
        'px-6',
        'py-3',
        'rounded-lg',
        'font-medium',
        'hover:bg-gray-300'
      );
    });

    it('external icon works with button variants', () => {
      render(
        <LinkTo
          href="https://example.com"
          label="External Button"
          variant="primary-button"
          external
        />
      );
      const link = screen.getByRole('link');
      expect(link).toHaveClass('bg-blue-600'); // Button styling
      const icon = link.querySelector('svg');
      expect(icon).toBeInTheDocument(); // External icon present
    });
  });

  describe('Description', () => {
    it('renders description when provided', () => {
      render(
        <RouterWrapper>
          <LinkTo
            href="/test"
            label="Link"
            description="This is a description"
          />
        </RouterWrapper>
      );
      expect(screen.getByText('This is a description')).toBeInTheDocument();
      // The -mt-2 class is on the div container, not the text itself
      const descriptionContainer = screen
        .getByText('This is a description')
        .closest('div');
      expect(descriptionContainer).toHaveClass('-mt-2');
    });

    it('does not render description when empty string', () => {
      render(
        <RouterWrapper>
          <LinkTo href="/test" label="Link" description="" />
        </RouterWrapper>
      );
      expect(screen.queryByRole('text')).not.toBeInTheDocument();
    });

    it('does not render description when undefined', () => {
      render(
        <RouterWrapper>
          <LinkTo href="/test" label="Link" />
        </RouterWrapper>
      );
      // Should only have the link, no description div
      expect(screen.getAllByRole('link')).toHaveLength(1);
    });

    it('formats description with italic styling', () => {
      render(
        <RouterWrapper>
          <LinkTo href="/test" label="Link" description="Italic description" />
        </RouterWrapper>
      );
      const description = screen.getByText('Italic description');
      expect(description.closest('em')).toBeInTheDocument();
      expect(description.closest('small')).toBeInTheDocument();
    });
  });

  describe('Props Combinations', () => {
    it('handles external button with description', () => {
      render(
        <LinkTo
          href="https://example.com"
          label="External Button"
          variant="primary-button"
          external
          description="Opens in new tab"
        />
      );

      const link = screen.getByRole('link');
      expect(link).toHaveClass('bg-blue-600'); // Button variant
      expect(link).toHaveAttribute('target', '_blank'); // External
      expect(screen.getByText('Opens in new tab')).toBeInTheDocument(); // Description
      expect(link.querySelector('svg')).toBeInTheDocument(); // External icon
    });

    it('handles internal button link', () => {
      render(
        <RouterWrapper>
          <LinkTo
            href="/internal"
            variant="normal-button"
            description="Internal button link"
          >
            <strong>Internal Button</strong>
          </LinkTo>
        </RouterWrapper>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveClass('bg-gray-200'); // Button variant
      expect(link).not.toHaveAttribute('target'); // Not external
      expect(link).toHaveTextContent('Internal Button');
      expect(screen.getByText('Internal button link')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined variant gracefully', () => {
      render(
        <RouterWrapper>
          <LinkTo
            href="/test"
            label="Test"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            variant={undefined as any}
          />
        </RouterWrapper>
      );
      const link = screen.getByRole('link');
      // Should default to default variant
      expect(link).toHaveClass('text-gray-600');
    });

    it('handles empty href', () => {
      render(
        <RouterWrapper>
          <LinkTo href="" label="Empty href" />
        </RouterWrapper>
      );
      const link = screen.getByRole('link');
      // React Router converts empty href to "/" automatically
      expect(link).toHaveAttribute('href', '/');
    });

    it('handles both label and children as empty', () => {
      render(
        <RouterWrapper>
          <LinkTo href="/test" label="" />
        </RouterWrapper>
      );
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });
  });
});
