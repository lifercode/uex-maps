import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { User } from '../types'

type AuthStoreState = {
  loggedInUser: User | null
}

type AuthStoreActions = {
  setLoggedInUser: (nextAuth: AuthStoreState['loggedInUser']) => void
  removeLoggedInUser: () => void
}

export const useAuthStore = create<AuthStoreState & AuthStoreActions>()(
  persist(
    (set) => ({
      loggedInUser: null,
      setLoggedInUser: (loggedInUser) => set({ loggedInUser }),
      removeLoggedInUser: () => set({ loggedInUser: null }),
    }),
    { name: 'uex-maps@logged-in-user-storage' },
  ),
)
