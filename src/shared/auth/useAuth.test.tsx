import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAuth, useUser, useUserName } from './useAuth';
import { AuthProvider } from './AuthProvider';

// Test components for each hook
const UseAuthTestComponent = () => {
  const { user, updateUser, login, logout, isAuthenticated } = useAuth();

  const handleUpdateName = () => {
    updateUser({ fullName: 'Hook Updated Name' });
  };

  return (
    <div>
      <div data-testid="hook-user-name">{user.fullName}</div>
      <div data-testid="hook-user-email">{user.email || 'No email'}</div>
      <div data-testid="hook-is-authenticated">
        {isAuthenticated.toString()}
      </div>
      <button onClick={handleUpdateName} data-testid="hook-update-name">
        Update Name
      </button>
      <div data-testid="hook-methods-available">
        {typeof login === 'function' && typeof logout === 'function'
          ? 'Methods available'
          : 'No methods'}
      </div>
    </div>
  );
};

const UseUserTestComponent = () => {
  const user = useUser();
  return (
    <div>
      <div data-testid="user-object-id">{user.id}</div>
      <div data-testid="user-object-name">{user.fullName}</div>
      <div data-testid="user-object-email">{user.email || 'No email'}</div>
      <div data-testid="user-object-theme">{user.preferences?.theme}</div>
      <div data-testid="user-object-notifications">
        {user.preferences?.notifications?.toString()}
      </div>
    </div>
  );
};

const UseUserNameTestComponent = () => {
  const userName = useUserName();
  return <div data-testid="user-name-only">{userName}</div>;
};

// Test components that use hooks outside provider (for error testing)
const UseAuthWithoutProvider = () => {
  const auth = useAuth();
  return <div>{auth.user.fullName}</div>;
};

const UseUserWithoutProvider = () => {
  const user = useUser();
  return <div>{user.fullName}</div>;
};

const UseUserNameWithoutProvider = () => {
  const userName = useUserName();
  return <div>{userName}</div>;
};

describe('useAuth Hooks', () => {
  beforeEach(() => {
    // Mock console.error to avoid noise from expected error tests
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('useAuth hook', () => {
    it('returns all context values when used within provider', () => {
      render(
        <AuthProvider>
          <UseAuthTestComponent />
        </AuthProvider>
      );

      // Should have access to user data
      expect(screen.getByTestId('hook-user-name')).toHaveTextContent('David H');
      expect(screen.getByTestId('hook-user-email')).toHaveTextContent(
        'No email'
      );
      expect(screen.getByTestId('hook-is-authenticated')).toHaveTextContent(
        'true'
      );

      // Should have access to methods
      expect(screen.getByTestId('hook-methods-available')).toHaveTextContent(
        'Methods available'
      );
    });

    it('allows updating user through returned updateUser method', () => {
      render(
        <AuthProvider>
          <UseAuthTestComponent />
        </AuthProvider>
      );

      fireEvent.click(screen.getByTestId('hook-update-name'));
      expect(screen.getByTestId('hook-user-name')).toHaveTextContent(
        'Hook Updated Name'
      );
    });

    it('throws error when used outside AuthProvider', () => {
      expect(() => {
        render(<UseAuthWithoutProvider />);
      }).toThrow('useAuth must be used within an AuthProvider');
    });

    it('provides reactive updates when context changes', () => {
      const TestComponent = () => {
        const { user, updateUser } = useAuth();

        return (
          <div>
            <div data-testid="reactive-name">{user.fullName}</div>
            <button
              onClick={() => updateUser({ fullName: 'Reactive Update' })}
              data-testid="reactive-update"
            >
              Update
            </button>
          </div>
        );
      };

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('reactive-name')).toHaveTextContent('David H');
      fireEvent.click(screen.getByTestId('reactive-update'));
      expect(screen.getByTestId('reactive-name')).toHaveTextContent(
        'Reactive Update'
      );
    });
  });

  describe('useUser hook', () => {
    it('returns user object when used within provider', () => {
      render(
        <AuthProvider>
          <UseUserTestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('user-object-id')).toHaveTextContent('1');
      expect(screen.getByTestId('user-object-name')).toHaveTextContent(
        'David H'
      );
      expect(screen.getByTestId('user-object-email')).toHaveTextContent(
        'No email'
      );
      expect(screen.getByTestId('user-object-theme')).toHaveTextContent(
        'light'
      );
      expect(screen.getByTestId('user-object-notifications')).toHaveTextContent(
        'true'
      );
    });

    it('returns updated user object when user data changes', () => {
      const TestComponent = () => {
        const user = useUser();
        const { updateUser } = useAuth();

        return (
          <div>
            <div data-testid="user-hook-name">{user.fullName}</div>
            <div data-testid="user-hook-email">{user.email || 'No email'}</div>
            <button
              onClick={() =>
                updateUser({
                  fullName: 'User Hook Update',
                  email: 'updated@example.com',
                })
              }
              data-testid="user-hook-update"
            >
              Update User
            </button>
          </div>
        );
      };

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      fireEvent.click(screen.getByTestId('user-hook-update'));
      expect(screen.getByTestId('user-hook-name')).toHaveTextContent(
        'User Hook Update'
      );
      expect(screen.getByTestId('user-hook-email')).toHaveTextContent(
        'updated@example.com'
      );
    });

    it('throws error when used outside AuthProvider', () => {
      expect(() => {
        render(<UseUserWithoutProvider />);
      }).toThrow('useAuth must be used within an AuthProvider');
    });

    it('returns same user object reference for unchanged data', () => {
      const TestComponent = () => {
        const user1 = useUser();
        const user2 = useUser();

        return (
          <div data-testid="same-reference">
            {user1 === user2 ? 'Same reference' : 'Different reference'}
          </div>
        );
      };

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('same-reference')).toHaveTextContent(
        'Same reference'
      );
    });
  });

  describe('useUserName hook', () => {
    it('returns user fullName when used within provider', () => {
      render(
        <AuthProvider>
          <UseUserNameTestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('user-name-only')).toHaveTextContent('David H');
    });

    it('returns updated name when user data changes', () => {
      const TestComponent = () => {
        const userName = useUserName();
        const { updateUser } = useAuth();

        return (
          <div>
            <div data-testid="name-hook-value">{userName}</div>
            <button
              onClick={() => updateUser({ fullName: 'Name Hook Update' })}
              data-testid="name-hook-update"
            >
              Update Name
            </button>
          </div>
        );
      };

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      fireEvent.click(screen.getByTestId('name-hook-update'));
      expect(screen.getByTestId('name-hook-value')).toHaveTextContent(
        'Name Hook Update'
      );
    });

    it('throws error when used outside AuthProvider', () => {
      expect(() => {
        render(<UseUserNameWithoutProvider />);
      }).toThrow('useAuth must be used within an AuthProvider');
    });

    it('only returns the fullName string, not the full user object', () => {
      const TestComponent = () => {
        const userName = useUserName();

        return (
          <div>
            <div data-testid="name-type">{typeof userName}</div>
            <div data-testid="name-value">{userName}</div>
            <div data-testid="name-is-string">
              {typeof userName === 'string' ? 'Is string' : 'Not string'}
            </div>
          </div>
        );
      };

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('name-type')).toHaveTextContent('string');
      expect(screen.getByTestId('name-value')).toHaveTextContent('David H');
      expect(screen.getByTestId('name-is-string')).toHaveTextContent(
        'Is string'
      );
    });
  });

  describe('Hook integration', () => {
    it('all hooks stay in sync when context updates', () => {
      const TestComponent = () => {
        const { updateUser } = useAuth();
        const user = useUser();
        const userName = useUserName();

        return (
          <div>
            <div data-testid="sync-full-name">{user.fullName}</div>
            <div data-testid="sync-user-name">{userName}</div>
            <div data-testid="sync-email">{user.email || 'No email'}</div>
            <button
              onClick={() =>
                updateUser({
                  fullName: 'Sync Test',
                  email: 'sync@example.com',
                })
              }
              data-testid="sync-update"
            >
              Update All
            </button>
          </div>
        );
      };

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      fireEvent.click(screen.getByTestId('sync-update'));

      // All hooks should reflect the same updated data
      expect(screen.getByTestId('sync-full-name')).toHaveTextContent(
        'Sync Test'
      );
      expect(screen.getByTestId('sync-user-name')).toHaveTextContent(
        'Sync Test'
      );
      expect(screen.getByTestId('sync-email')).toHaveTextContent(
        'sync@example.com'
      );
    });

    it('multiple instances of hooks in different components stay synchronized', () => {
      const ComponentA = () => {
        const userName = useUserName();
        return <div data-testid="component-a-name">{userName}</div>;
      };

      const ComponentB = () => {
        const user = useUser();
        const { updateUser } = useAuth();
        return (
          <div>
            <div data-testid="component-b-name">{user.fullName}</div>
            <button
              onClick={() => updateUser({ fullName: 'Multi Component Update' })}
              data-testid="component-b-update"
            >
              Update
            </button>
          </div>
        );
      };

      render(
        <AuthProvider>
          <ComponentA />
          <ComponentB />
        </AuthProvider>
      );

      fireEvent.click(screen.getByTestId('component-b-update'));

      // Both components should show the updated name
      expect(screen.getByTestId('component-a-name')).toHaveTextContent(
        'Multi Component Update'
      );
      expect(screen.getByTestId('component-b-name')).toHaveTextContent(
        'Multi Component Update'
      );
    });
  });

  describe('Error handling', () => {
    it('provides clear error message for useAuth outside provider', () => {
      expect(() => {
        render(<UseAuthWithoutProvider />);
      }).toThrow('useAuth must be used within an AuthProvider');
    });

    it('provides clear error message for useUser outside provider', () => {
      expect(() => {
        render(<UseUserWithoutProvider />);
      }).toThrow('useAuth must be used within an AuthProvider');
    });

    it('provides clear error message for useUserName outside provider', () => {
      expect(() => {
        render(<UseUserNameWithoutProvider />);
      }).toThrow('useAuth must be used within an AuthProvider');
    });
  });
});
