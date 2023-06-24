import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setError(null);
    setIsLoading(true);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!json.ok) {
      setError(json.error);
      setIsLoading(false);
    }
    if (response.ok) {
      //  set user in local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update auth context1

      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };
  return {signup, error, isLoading};
};
