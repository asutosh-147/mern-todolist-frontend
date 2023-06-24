import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";
export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workout_dispatch } = useWorkoutsContext();
  const logout = () => {
    // clear the local storage
    localStorage.clear("user");
    // remove from global state
    dispatch({ type: "LOGOUT" });
    workout_dispatch({ type: "SET_WORKOUTS", payload: null });
  };
  return { logout };
};
