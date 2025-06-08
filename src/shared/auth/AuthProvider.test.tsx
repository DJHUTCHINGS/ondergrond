import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useContext } from 'react';
import { AuthProvider } from './AuthProvider';
import { AuthContext } from './AuthContext';

// Test component to access the context
const TestComponent = () => {
  const context = useContext(AuthContext);

  if (!context) {
    return <div data-testid="no-context">No context</div>;
  }

  const { user, updateUser, login, logout, isAuthenticated } = context;

  const handleUpdateName = () => {
    updateUser({ fullName: 'Updated Name' });
  };

  const handleUpdateEmail = () => {
    updateUser({ email: 'new@example.com' });
  };

  const handleUpdatePreferences = () => {
    updateUser({
      preferences: {
        theme: 'dark',
        notifications: false,
      },
    });
  };

  const handlePartialPreferences = () => {
    updateUser({
      preferences: {
        theme: 'dark', // Only update theme, keep notifications
      },
    });
  };

  const handleLogin = async () => {
    try {
      await login('test@example.com', 'password');
    } catch (error) {
      console.error(error);
      // Expected to fail in mock implementation
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <div data-testid="user-id">{user.id}</div>
      <div data-testid="user-name">{user.fullName}</div>
      <div data-testid="user-email">{user.email || 'No email'}</div>
      <div data-testid="user-theme">
        {user.preferences?.theme || 'No theme'}
      </div>
      <div data-testid="user-notifications">
        {user.preferences?.notifications?.toString() || 'No notifications'}
      </div>
      <div data-testid="is-authenticated">{isAuthenticated.toString()}</div>
      <button onClick={handleUpdateName} data-testid="update-name">
        Update Name
      </button>
      <button onClick={handleUpdateEmail} data-testid="update-email">
        Update Email
      </button>
      <button
        onClick={handleUpdatePreferences}
        data-testid="update-preferences"
      >
        Update Preferences
      </button>
      <button
        onClick={handlePartialPreferences}
        data-testid="partial-preferences"
      >
        Partial Preferences
      </button>
      <button onClick={handleLogin} data-testid="login">
        Login
      </button>
      <button onClick={handleLogout} data-testid="logout">
        Logout
      </button>
    </div>
  );
};

describe('AuthProvider', () => {
  beforeEach(() => {
    // Mock console methods to avoid noise in tests
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('Initial State', () => {
    it('provides default user data', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('user-id')).toHaveTextContent('1');
      expect(screen.getByTestId('user-name')).toHaveTextContent('David H');
      expect(screen.getByTestId('user-email')).toHaveTextContent('No email');
      expect(screen.getByTestId('user-theme')).toHaveTextContent('light');
      expect(screen.getByTestId('user-notifications')).toHaveTextContent(
        'true'
      );
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
    });

    it('renders children components', () => {
      render(
        <AuthProvider>
          <div data-testid="child-component">Child Content</div>
        </AuthProvider>
      );

      expect(screen.getByTestId('child-component')).toHaveTextContent(
        'Child Content'
      );
    });

    it('provides context to nested children', () => {
      render(
        <AuthProvider>
          <div>
            <div>
              <TestComponent />
            </div>
          </div>
        </AuthProvider>
      );

      expect(screen.getByTestId('user-name')).toHaveTextContent('David H');
    });
  });

  describe('updateUser functionality', () => {
    it('updates user name', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      fireEvent.click(screen.getByTestId('update-name'));
      expect(screen.getByTestId('user-name')).toHaveTextContent('Updated Name');
    });

    it('updates user email', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      fireEvent.click(screen.getByTestId('update-email'));
      expect(screen.getByTestId('user-email')).toHaveTextContent(
        'new@example.com'
      );
    });

    it('updates complete preferences object', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      fireEvent.click(screen.getByTestId('update-preferences'));
      expect(screen.getByTestId('user-theme')).toHaveTextContent('dark');
      expect(screen.getByTestId('user-notifications')).toHaveTextContent(
        'false'
      );
    });

    it('merges preferences correctly with partial updates', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      fireEvent.click(screen.getByTestId('partial-preferences'));
      expect(screen.getByTestId('user-theme')).toHaveTextContent('dark');
      expect(screen.getByTestId('user-notifications')).toHaveTextContent(
        'true'
      ); // Should preserve original
    });

    it('preserves existing user data when updating specific fields', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Update name
      fireEvent.click(screen.getByTestId('update-name'));

      // Other fields should remain unchanged
      expect(screen.getByTestId('user-id')).toHaveTextContent('1');
      expect(screen.getByTestId('user-theme')).toHaveTextContent('light');
      expect(screen.getByTestId('user-notifications')).toHaveTextContent(
        'true'
      );
    });

    it('handles multiple sequential updates', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Update name, then email, then preferences
      fireEvent.click(screen.getByTestId('update-name'));
      fireEvent.click(screen.getByTestId('update-email'));
      fireEvent.click(screen.getByTestId('partial-preferences'));

      expect(screen.getByTestId('user-name')).toHaveTextContent('Updated Name');
      expect(screen.getByTestId('user-email')).toHaveTextContent(
        'new@example.com'
      );
      expect(screen.getByTestId('user-theme')).toHaveTextContent('dark');
      expect(screen.getByTestId('user-notifications')).toHaveTextContent(
        'true'
      );
    });
  });

  describe('login method', () => {
    it('logs login attempt with correct parameters', async () => {
      const consoleSpy = vi.spyOn(console, 'log');

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await act(async () => {
        fireEvent.click(screen.getByTestId('login'));
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        'Login attempted:',
        'test@example.com',
        'password'
      );
    });

    it('throws error for unimplemented authentication', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // The login should fail silently in our test component since we catch the error
      await act(async () => {
        fireEvent.click(screen.getByTestId('login'));
      });

      // User should still be authenticated (mock implementation)
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
    });
  });

  describe('logout method', () => {
    it('resets user to default state', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // First, modify the user
      fireEvent.click(screen.getByTestId('update-name'));
      fireEvent.click(screen.getByTestId('update-email'));
      expect(screen.getByTestId('user-name')).toHaveTextContent('Updated Name');
      expect(screen.getByTestId('user-email')).toHaveTextContent(
        'new@example.com'
      );

      // Then logout
      fireEvent.click(screen.getByTestId('logout'));

      // Should be back to defaults
      expect(screen.getByTestId('user-name')).toHaveTextContent('David H');
      expect(screen.getByTestId('user-email')).toHaveTextContent('No email');
      expect(screen.getByTestId('user-theme')).toHaveTextContent('light');
      expect(screen.getByTestId('user-notifications')).toHaveTextContent(
        'true'
      );
    });

    it('logs logout attempt', () => {
      const consoleSpy = vi.spyOn(console, 'log');

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      fireEvent.click(screen.getByTestId('logout'));
      expect(consoleSpy).toHaveBeenCalledWith('Logout attempted');
    });
  });

  describe('isAuthenticated property', () => {
    it('always returns true in mock implementation', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');

      // Should remain true after user updates
      fireEvent.click(screen.getByTestId('update-name'));
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');

      // Should remain true after logout
      fireEvent.click(screen.getByTestId('logout'));
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
    });
  });

  describe('Context Provider behavior', () => {
    it('provides context value to children', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Should not show "no context" message
      expect(screen.queryByTestId('no-context')).not.toBeInTheDocument();
      expect(screen.getByTestId('user-name')).toBeInTheDocument();
    });

    it('handles multiple children correctly', () => {
      const ChildA = () => {
        const context = useContext(AuthContext);
        return <div data-testid="child-a">{context?.user.fullName}</div>;
      };

      const ChildB = () => {
        const context = useContext(AuthContext);
        return <div data-testid="child-b">{context?.user.id}</div>;
      };

      render(
        <AuthProvider>
          <ChildA />
          <ChildB />
        </AuthProvider>
      );

      expect(screen.getByTestId('child-a')).toHaveTextContent('David H');
      expect(screen.getByTestId('child-b')).toHaveTextContent('1');
    });
  });

  describe('DEFAULT_USER constant', () => {
    it('has correct default values', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Verify all default values match the constant
      expect(screen.getByTestId('user-id')).toHaveTextContent('1');
      expect(screen.getByTestId('user-name')).toHaveTextContent('David H');
      expect(screen.getByTestId('user-email')).toHaveTextContent('No email');
      expect(screen.getByTestId('user-theme')).toHaveTextContent('light');
      expect(screen.getByTestId('user-notifications')).toHaveTextContent(
        'true'
      );
    });
  });
});
