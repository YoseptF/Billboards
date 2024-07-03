import { useEffect, useState } from "react";

import { pbClient } from "../client";

const authInitialState: {
  isLoggedIn: undefined | boolean;
  isAdmin: undefined | boolean;
  token: undefined | string;
} = {
  isLoggedIn: undefined,
  isAdmin: undefined,
  token: undefined
};

export const useAuth = () => {
  const [authState, setAuthState] = useState(authInitialState);
  useEffect(() => {
    const { isAdmin, isValid, token } = pbClient.authStore;

    const cancel = pbClient.authStore.onChange(() => {
      // handle auth state change
    });

    setAuthState({
      isLoggedIn: isValid,
      isAdmin,
      token
    });

    return () => {
      cancel();
    };

  }, []);

  return authState;
};