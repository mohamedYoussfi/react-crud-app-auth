import { useState } from "react";

export const useAuthState = () => {
  const initState = {
    isAuthenticated: false,
    username: undefined,
    roles: undefined,
  };

  const authState = useState(initState);

  return authState;
};
