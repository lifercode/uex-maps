import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  LOGOUT_SUCCESS_MESSAGE,
  CREATE_ACCOUNT_SUCCESS_MESSAGE,
  DELETE_ACCOUNT_SUCCESS_MESSAGE,
  LOGIN_SUCCESS_MESSAGE,
  CREATE_ACCOUNT_MAIL_ERROR_MESSAGE,
  LOGIN_CREDENTIALS_ERROR_MESSAGE,
  DELETE_ACCOUNT_CREDENTIALS_ERROR_MESSAGE,
} from '../constants/feedback-messages'
import { useAuthStore } from "../store/auth";
import { useUsersStore } from "../store/users";
import { useContactsStore } from "../store/contacts";
import { toast } from "../lib/utils/toast";

export const useAuth = () => {
  const { loggedInUser, setLoggedInUser, removeLoggedInUser } = useAuthStore();
  const { users, addUser, removeUser } = useUsersStore();
  const { removeAllContactsByUser, selectContact } = useContactsStore();

  const isAuthenticated = Boolean(loggedInUser);

  const createAccount = useCallback(async (name: string, email: string, password: string, onSuccess: () => void) => {
    if (users.find(user => user.email === email)) {
      toast(CREATE_ACCOUNT_MAIL_ERROR_MESSAGE);
    } else {
      addUser({ id: uuidv4(), name, email, password });
      toast(CREATE_ACCOUNT_SUCCESS_MESSAGE);
      onSuccess();
    }
  }, [addUser, users]);

  const login = useCallback(async (email: string, password: string, onSuccess: () => void) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      toast(LOGIN_CREDENTIALS_ERROR_MESSAGE)
    } else {
      setLoggedInUser(user);
      onSuccess();
      toast(LOGIN_SUCCESS_MESSAGE);
    }
  }, [setLoggedInUser, users]);

  const logout = useCallback((onSuccess: () => void) => {
    selectContact(null);
    removeLoggedInUser();
    toast(LOGOUT_SUCCESS_MESSAGE);
    onSuccess();
  }, [removeLoggedInUser, selectContact]);

  const deleteAccount = useCallback(async (id: string, password: string, onSuccess: () => void) => {
    const userIndex = users.findIndex(user => user.id === id && user.password === password);

    if (userIndex === -1) {
      toast(DELETE_ACCOUNT_CREDENTIALS_ERROR_MESSAGE);
    } else {
      selectContact(null);
      removeAllContactsByUser(id);
      removeUser(id);
      removeLoggedInUser();
      toast(DELETE_ACCOUNT_SUCCESS_MESSAGE);
      onSuccess();
    }
  }, [removeAllContactsByUser, removeLoggedInUser, removeUser, selectContact, users]);

  return {
    isAuthenticated,
    loggedInUser,
    createAccount,
    login,
    logout,
    deleteAccount,
  };
};
