import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  hasSeenOnboarding: boolean;
  isAuthenticated: boolean;
  bookmarks: string[]; // IDs of bookmarked items
  setHasSeenOnboarding: (seen: boolean) => void;
  login: () => void;
  logout: () => void;
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      hasSeenOnboarding: true,
      isAuthenticated: true,
      bookmarks: [],
      setHasSeenOnboarding: (seen) => set({ hasSeenOnboarding: seen }),
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
      toggleBookmark: (id) => {
        const { bookmarks } = get();
        if (bookmarks.includes(id)) {
          set({ bookmarks: bookmarks.filter((b) => b !== id) });
        } else {
          set({ bookmarks: [...bookmarks, id] });
        }
      },
      isBookmarked: (id) => get().bookmarks.includes(id),
    }),
    {
      name: 'cheapsrv-storage',
    }
  )
);
