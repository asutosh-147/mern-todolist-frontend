import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { formatDistanceToNow } from "date-fns";
import { useAuthContext } from "../hooks/useAuthContext";
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const handleDelete = async () => {
    if(!user){
      return
    }
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: data });
    }
  };
  return (
    <>
      <div className="workout-template">
        <h4>{workout.title}</h4>
        <p>
          <strong>load : </strong>
          {workout.load}
        </p>
        <p>
          <strong>reps : </strong>
          {workout.reps}
        </p>
        <p>
          {formatDistanceToNow(new Date(workout.createdAt), {
            addsuffix: true,
            includeSeconds: true,
          })}
        </p>
        <span onClick={handleDelete}>
          <IconButton>
            <DeleteIcon fontSize="medium" sx={{ color: "#F0F8FF" }} />
          </IconButton>
        </span>
      </div>
    </>
  );
};

export default WorkoutDetails;
