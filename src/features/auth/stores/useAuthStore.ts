import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createClient } from '@/utils/supabase/client';

interface User {
  id: string;
  email: string;
  username?: string;
  profile_username?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  signIn: (user: User) => void;
  signOut: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  updateProfile: (profile: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      signIn: (user) => set({ user, isAuthenticated: true, isLoading: false }),
      signOut: async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        set({ user: null, isAuthenticated: false });
      },
      setLoading: (loading) => set({ isLoading: loading }),
      updateProfile: (profile) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...profile } : null,
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);
