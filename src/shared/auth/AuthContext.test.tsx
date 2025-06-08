import { render } from '@testing-library/react';
import { useContext } from 'react';
import { describe, it, expect } from 'vitest';
import {
  AuthContext,
  type UserIdentity,
  type AuthContextType,
} from './AuthContext';

// Test component to verify context exists and has undefined default value
const TestContextAccess = () => {
  const context = useContext(AuthContext);

  return (
    <div data-testid="context-value">
      {context === undefined ? 'undefined' : 'defined'}
    </div>
  );
};

// Test component to verify type constraints
const TestTypeConstraints = () => {
  const context = useContext(AuthContext);

  // This tests that the context type allows both undefined and AuthContextType
  const handleContext = (ctx: AuthContextType | undefined) => {
    if (ctx) {
      return `User: ${ctx.user.fullName}, Auth: ${ctx.isAuthenticated}`;
    }
    return 'No context';
  };

  return <div data-testid="type-check">{handleContext(context)}</div>;
};

describe('AuthContext', () => {
  describe('Context Creation', () => {
    it('creates context with undefined default value', () => {
      render(<TestContextAccess />);

      const contextElement = document.querySelector(
        '[data-testid="context-value"]'
      );
      expect(contextElement).toHaveTextContent('undefined');
    });

    it('accepts AuthContextType | undefined as expected', () => {
      render(<TestTypeConstraints />);

      const typeElement = document.querySelector('[data-testid="type-check"]');
      expect(typeElement).toHaveTextContent('No context');
    });

    it('exists as a React context object', () => {
      expect(AuthContext).toBeDefined();
      expect(AuthContext.Provider).toBeDefined();
      expect(AuthContext.Consumer).toBeDefined();
    });
  });

  describe('TypeScript Interface Exports', () => {
    it('UserIdentity interface has correct shape', () => {
      // This is a compile-time test - if the interface is wrong, TypeScript will error
      const validUser: UserIdentity = {
        id: '1',
        fullName: 'Test User',
        email: 'test@example.com',
        avatar: 'avatar.jpg',
        preferences: {
          theme: 'light',
          notifications: true,
        },
      };

      // Test required fields
      expect(validUser.id).toBe('1');
      expect(validUser.fullName).toBe('Test User');
    });

    it('UserIdentity allows minimal required fields only', () => {
      const minimalUser: UserIdentity = {
        id: '2',
        fullName: 'Minimal User',
      };

      expect(minimalUser.id).toBe('2');
      expect(minimalUser.fullName).toBe('Minimal User');
      expect(minimalUser.email).toBeUndefined();
      expect(minimalUser.avatar).toBeUndefined();
      expect(minimalUser.preferences).toBeUndefined();
    });

    it('UserIdentity preferences interface allows partial values', () => {
      const userWithPartialPreferences: UserIdentity = {
        id: '3',
        fullName: 'Partial User',
        preferences: {
          theme: 'dark',
          // notifications is optional
        },
      };

      expect(userWithPartialPreferences.preferences?.theme).toBe('dark');
      expect(
        userWithPartialPreferences.preferences?.notifications
      ).toBeUndefined();
    });

    it('UserIdentity theme enum is constrained correctly', () => {
      // These should compile successfully
      const lightThemeUser: UserIdentity = {
        id: '4',
        fullName: 'Light User',
        preferences: { theme: 'light' },
      };

      const darkThemeUser: UserIdentity = {
        id: '5',
        fullName: 'Dark User',
        preferences: { theme: 'dark' },
      };

      expect(lightThemeUser.preferences?.theme).toBe('light');
      expect(darkThemeUser.preferences?.theme).toBe('dark');
    });

    it('AuthContextType interface has correct shape', () => {
      // Mock function implementations for testing interface shape
      const mockUpdateUser = (updates: Partial<UserIdentity>) => {
        console.log('Mock update:', updates);
      };

      const mockLogin = async (email: string, password: string) => {
        console.log('Mock login:', email, password);
      };

      const mockLogout = () => {
        console.log('Mock logout');
      };

      const validAuthContext: AuthContextType = {
        user: {
          id: '1',
          fullName: 'Test User',
        },
        updateUser: mockUpdateUser,
        login: mockLogin,
        logout: mockLogout,
        isAuthenticated: true,
      };

      expect(validAuthContext.user.id).toBe('1');
      expect(validAuthContext.isAuthenticated).toBe(true);
      expect(typeof validAuthContext.updateUser).toBe('function');
      expect(typeof validAuthContext.login).toBe('function');
      expect(typeof validAuthContext.logout).toBe('function');
    });
  });

  describe('Context Provider Behavior', () => {
    it('can be used with Provider to supply value', () => {
      const mockUser: UserIdentity = {
        id: 'test-id',
        fullName: 'Provider Test User',
      };

      const mockAuthValue: AuthContextType = {
        user: mockUser,
        updateUser: () => {},
        login: async () => {},
        logout: () => {},
        isAuthenticated: true,
      };

      const TestWithProvider = () => {
        const context = useContext(AuthContext);
        return (
          <div data-testid="provider-test">
            {context ? context.user.fullName : 'No context'}
          </div>
        );
      };

      render(
        <AuthContext.Provider value={mockAuthValue}>
          <TestWithProvider />
        </AuthContext.Provider>
      );

      const providerElement = document.querySelector(
        '[data-testid="provider-test"]'
      );
      expect(providerElement).toHaveTextContent('Provider Test User');
    });

    it('can be used with Provider supplying undefined', () => {
      const TestWithUndefinedProvider = () => {
        const context = useContext(AuthContext);
        return (
          <div data-testid="undefined-provider-test">
            {context === undefined ? 'Undefined context' : 'Defined context'}
          </div>
        );
      };

      render(
        <AuthContext.Provider value={undefined}>
          <TestWithUndefinedProvider />
        </AuthContext.Provider>
      );

      const undefinedElement = document.querySelector(
        '[data-testid="undefined-provider-test"]'
      );
      expect(undefinedElement).toHaveTextContent('Undefined context');
    });
  });

  describe('Type Safety', () => {
    it('supports Partial<UserIdentity> for updates', () => {
      // This tests the updateUser parameter type
      const testPartialUpdate = (updates: Partial<UserIdentity>) => {
        return Object.keys(updates);
      };

      // These should all be valid partial updates
      const nameOnlyUpdate = testPartialUpdate({ fullName: 'New Name' });
      const emailOnlyUpdate = testPartialUpdate({ email: 'new@example.com' });
      const preferencesOnlyUpdate = testPartialUpdate({
        preferences: { theme: 'dark' },
      });
      const multiFieldUpdate = testPartialUpdate({
        fullName: 'Updated Name',
        email: 'updated@example.com',
        preferences: { notifications: false },
      });

      expect(nameOnlyUpdate).toContain('fullName');
      expect(emailOnlyUpdate).toContain('email');
      expect(preferencesOnlyUpdate).toContain('preferences');
      expect(multiFieldUpdate).toContain('fullName');
      expect(multiFieldUpdate).toContain('email');
      expect(multiFieldUpdate).toContain('preferences');
    });

    it('login method has correct async signature', () => {
      const testLogin = async (
        loginFn: (email: string, password: string) => Promise<void>
      ) => {
        await loginFn('test@example.com', 'password');
        return 'Login attempted';
      };

      const mockLogin = async (email: string, password: string) => {
        expect(email).toBe('test@example.com');
        expect(password).toBe('password');
      };

      expect(testLogin(mockLogin)).resolves.toBe('Login attempted');
    });
  });

  describe('Interface Completeness', () => {
    it('UserIdentity covers all expected user properties', () => {
      const completeUser: UserIdentity = {
        id: 'complete-id',
        fullName: 'Complete User',
        email: 'complete@example.com',
        avatar: 'https://example.com/avatar.jpg',
        preferences: {
          theme: 'light',
          notifications: true,
        },
      };

      // Verify all properties are accessible
      expect(typeof completeUser.id).toBe('string');
      expect(typeof completeUser.fullName).toBe('string');
      expect(typeof completeUser.email).toBe('string');
      expect(typeof completeUser.avatar).toBe('string');
      expect(typeof completeUser.preferences).toBe('object');
      expect(completeUser.preferences?.theme).toBe('light');
      expect(completeUser.preferences?.notifications).toBe(true);
    });

    it('AuthContextType covers all expected auth functionality', () => {
      const mockContext: AuthContextType = {
        user: { id: '1', fullName: 'Test' },
        updateUser: () => {},
        login: async () => {},
        logout: () => {},
        isAuthenticated: false,
      };

      // Verify all required properties exist
      expect(mockContext).toHaveProperty('user');
      expect(mockContext).toHaveProperty('updateUser');
      expect(mockContext).toHaveProperty('login');
      expect(mockContext).toHaveProperty('logout');
      expect(mockContext).toHaveProperty('isAuthenticated');

      // Verify types
      expect(typeof mockContext.user).toBe('object');
      expect(typeof mockContext.updateUser).toBe('function');
      expect(typeof mockContext.login).toBe('function');
      expect(typeof mockContext.logout).toBe('function');
      expect(typeof mockContext.isAuthenticated).toBe('boolean');
    });
  });
});
