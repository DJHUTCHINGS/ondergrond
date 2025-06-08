import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider } from './AuthContext';
import { useAuth, useUser, useUserName } from './useAuth';

//8JUN2025 - This tests some phony stuff, which is silly, but it should remind me to test whatever I end up implementing

// Test components to verify context behavior
const TestComponentWithAuth = () => {
  const { user, updateUser, login, logout, isAuthenticated } = useAuth();

  const handleUpdateName = () => {
    updateUser({ fullName: 'Updated Name' });
  };

  const handleUpdatePreferences = () => {
    updateUser({
      preferences: {
        theme: 'dark',
        notifications: false,
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
      <button
        onClick={handleUpdatePreferences}
        data-testid="update-preferences"
      >
        Update Preferences
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

const TestComponentWithUser = () => {
  const user = useUser();
  return (
    <div>
      <div data-testid="user-object">{JSON.stringify(user)}</div>
    </div>
  );
};

const TestComponentWithUserName = () => {
  const userName = useUserName();
  return (
    <div>
      <div data-testid="user-name-only">{userName}</div>
    </div>
  );
};

const TestComponentWithoutProvider = () => {
  const { user } = useAuth();
  return <div>{user.fullName}</div>;
};

describe('AuthContext', () => {
  // Mock console methods to avoid noise in tests
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('AuthProvider', () => {
    it('provides default user data', () => {
      render(
        <AuthProvider>
          <TestComponentWithAuth />
        </AuthProvider>
      );

      expect(screen.getByTestId('user-name')).toHaveTextContent('David H');
      expect(screen.getByTestId('user-email')).toHaveTextContent('No email');
      expect(screen.getByTestId('user-theme')).toHaveTextContent('light');
      expect(screen.getByTestId('user-notifications')).toHaveTextContent(
        'true'
      );
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
    });

    it('allows updating user name', () => {
      render(
        <AuthProvider>
          <TestComponentWithAuth />
        </AuthProvider>
      );

      fireEvent.click(screen.getByTestId('update-name'));
      expect(screen.getByTestId('user-name')).toHaveTextContent('Updated Name');
    });

    it('allows updating user preferences', () => {
      render(
        <AuthProvider>
          <TestComponentWithAuth />
        </AuthProvider>
      );

      fireEvent.click(screen.getByTestId('update-preferences'));
      expect(screen.getByTestId('user-theme')).toHaveTextContent('dark');
      expect(screen.getByTestId('user-notifications')).toHaveTextContent(
        'false'
      );
    });

    it('preserves existing user data when updating', () => {
      render(
        <AuthProvider>
          <TestComponentWithAuth />
        </AuthProvider>
      );

      // Update only name
      fireEvent.click(screen.getByTestId('update-name'));

      // Theme should still be the original value
      expect(screen.getByTestId('user-theme')).toHaveTextContent('light');
      expect(screen.getByTestId('user-name')).toHaveTextContent('Updated Name');
    });

    it('merges preferences correctly', () => {
      render(
        <AuthProvider>
          <TestComponentWithAuth />
        </AuthProvider>
      );

      // First update theme only
      act(() => {
        fireEvent.click(screen.getByTestId('update-preferences'));
      });

      expect(screen.getByTestId('user-theme')).toHaveTextContent('dark');
      expect(screen.getByTestId('user-notifications')).toHaveTextContent(
        'false'
      );
    });
  });

  describe('login method', () => {
    it('calls login with correct parameters', async () => {
      const consoleSpy = vi.spyOn(console, 'log');

      render(
        <AuthProvider>
          <TestComponentWithAuth />
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

    it('throws error for unimplemented login', async () => {
      render(
        <AuthProvider>
          <TestComponentWithAuth />
        </AuthProvider>
      );

      // The login should fail silently in our test component
      // since we catch the error
      await act(async () => {
        fireEvent.click(screen.getByTestId('login'));
      });

      // User should still be authenticated (mock implementation)
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
    });
  });

  describe('logout method', () => {
    it('resets user to default state on logout', () => {
      render(
        <AuthProvider>
          <TestComponentWithAuth />
        </AuthProvider>
      );

      // First, update the user
      fireEvent.click(screen.getByTestId('update-name'));
      expect(screen.getByTestId('user-name')).toHaveTextContent('Updated Name');

      // Then logout
      fireEvent.click(screen.getByTestId('logout'));
      expect(screen.getByTestId('user-name')).toHaveTextContent('David H');
    });

    it('logs logout attempt', () => {
      const consoleSpy = vi.spyOn(console, 'log');

      render(
        <AuthProvider>
          <TestComponentWithAuth />
        </AuthProvider>
      );

      fireEvent.click(screen.getByTestId('logout'));
      expect(consoleSpy).toHaveBeenCalledWith('Logout attempted');
    });
  });

  describe('useAuth hook', () => {
    it('throws error when used outside provider', () => {
      const consoleSpy = vi.spyOn(console, 'error');

      expect(() => {
        render(<TestComponentWithoutProvider />);
      }).toThrow('useAuth must be used within an AuthProvider');

      consoleSpy.mockRestore();
    });

    it('returns all context values', () => {
      render(
        <AuthProvider>
          <TestComponentWithAuth />
        </AuthProvider>
      );

      // All context values should be accessible
      expect(screen.getByTestId('user-name')).toBeInTheDocument();
      expect(screen.getByTestId('is-authenticated')).toBeInTheDocument();
      expect(screen.getByTestId('update-name')).toBeInTheDocument();
      expect(screen.getByTestId('login')).toBeInTheDocument();
      expect(screen.getByTestId('logout')).toBeInTheDocument();
    });
  });

  describe('useUser hook', () => {
    it('returns user object', () => {
      render(
        <AuthProvider>
          <TestComponentWithUser />
        </AuthProvider>
      );

      const userObject = screen.getByTestId('user-object');
      const userData = JSON.parse(userObject.textContent || '{}');

      expect(userData.id).toBe('1');
      expect(userData.fullName).toBe('David H');
      expect(userData.preferences.theme).toBe('light');
      expect(userData.preferences.notifications).toBe(true);
    });

    it('throws error when used outside provider', () => {
      const TestBadComponent = () => {
        const user = useUser();
        return <div>{user.fullName}</div>;
      };

      expect(() => {
        render(<TestBadComponent />);
      }).toThrow('useAuth must be used within an AuthProvider');
    });
  });

  describe('useUserName hook', () => {
    it('returns user full name', () => {
      render(
        <AuthProvider>
          <TestComponentWithUserName />
        </AuthProvider>
      );

      expect(screen.getByTestId('user-name-only')).toHaveTextContent('David H');
    });

    it('updates when user name changes', () => {
      const TestComponent = () => {
        const { updateUser } = useAuth();
        const userName = useUserName();

        return (
          <div>
            <div data-testid="current-name">{userName}</div>
            <button
              onClick={() => updateUser({ fullName: 'New Name' })}
              data-testid="change-name"
            >
              Change Name
            </button>
          </div>
        );
      };

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('current-name')).toHaveTextContent('David H');

      fireEvent.click(screen.getByTestId('change-name'));
      expect(screen.getByTestId('current-name')).toHaveTextContent('New Name');
    });

    it('throws error when used outside provider', () => {
      const TestBadComponent = () => {
        const userName = useUserName();
        return <div>{userName}</div>;
      };

      expect(() => {
        render(<TestBadComponent />);
      }).toThrow('useAuth must be used within an AuthProvider');
    });
  });

  describe('Default User Data', () => {
    it('has correct default values', () => {
      render(
        <AuthProvider>
          <TestComponentWithAuth />
        </AuthProvider>
      );

      expect(screen.getByTestId('user-name')).toHaveTextContent('David H');
      expect(screen.getByTestId('user-email')).toHaveTextContent('No email');
      expect(screen.getByTestId('user-theme')).toHaveTextContent('light');
      expect(screen.getByTestId('user-notifications')).toHaveTextContent(
        'true'
      );
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
    });
  });

  describe('Partial Updates', () => {
    it('handles partial user updates correctly', () => {
      const TestPartialUpdate = () => {
        const { user, updateUser } = useAuth();

        const handlePartialUpdate = () => {
          updateUser({
            email: 'new@example.com',
            preferences: { theme: 'dark' }, // Only updating theme, not notifications
          });
        };

        return (
          <div>
            <div data-testid="email">{user.email || 'No email'}</div>
            <div data-testid="theme">{user.preferences?.theme}</div>
            <div data-testid="notifications">
              {user.preferences?.notifications?.toString()}
            </div>
            <button onClick={handlePartialUpdate} data-testid="partial-update">
              Partial Update
            </button>
          </div>
        );
      };

      render(
        <AuthProvider>
          <TestPartialUpdate />
        </AuthProvider>
      );

      fireEvent.click(screen.getByTestId('partial-update'));

      expect(screen.getByTestId('email')).toHaveTextContent('new@example.com');
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      expect(screen.getByTestId('notifications')).toHaveTextContent('true'); // Should preserve original
    });
  });
});
