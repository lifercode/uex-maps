import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { User } from '../types'

type UsersStoreState = {
  users: User[]
}

type UsersStoreActions = {
  setUsers: (nextUsers: UsersStoreState['users']) => void
  addUser: (newUser: User) => void
  removeUser: (userId: string) => void
}

export const useUsersStore = create<UsersStoreState & UsersStoreActions>()(
  persist(
    (set) => ({
      users: [],
      setUsers: (users) => set({ users }),
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      removeUser: (userId) => set((state) => ({ users: [...state.users.filter(({ id }) => id !== userId)] })),
    }),
    { name: 'uex-maps@users-storage' },
  ),
)
