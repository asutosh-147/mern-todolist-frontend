import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  useEffect(() => {
    if (user) {
      fetch("/api/workouts", {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
        .then((res) => {
          if (res.ok) return res.json();
        })
        .then((json) => {
          dispatch({ type: "SET_WORKOUTS", payload: json });
        });
    }
  }, [dispatch, user]);

  return (
    <>
      <div className="home">
        <div className="workouts">
          {workouts &&
            workouts.map((work) => (
              <WorkoutDetails key={work._id} workout={work} id={work._id} />
            ))}
        </div>
        <div className="form">
          <WorkoutForm />
        </div>
      </div>
    </>
  );
};

export default Home;
