import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
export default function WorkoutForm() {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyfields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();
  console.log(error, emptyfields);
  const handlesubmit = async (e) => {
    e.preventDefault();
    if(!user){
      setError('Please login')
      return
    }
    const workout = { title, load, reps };

    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.msg);
      setEmptyFields(data.emptyfields);
    }
    if (res.ok) {
      setLoad("");
      setTitle("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      console.log("work out added", data);
      dispatch({ type: "CREATE_WORKOUT", payload: data });
    }
  };
  return (
    <form action="submit" onSubmit={handlesubmit} className="workout-form">
      <h3>Add New Workout</h3>
      <input
        type="text"
        // required
        placeholder="Workout Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyfields.includes("title") ? "error" : ""}
      />
      <input
        type="number"
        // required
        placeholder="Load"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyfields.includes("load") ? "error" : ""}
      />
      <input
        type="number"
        placeholder="Reps"
        // required
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyfields.includes("reps") ? "error" : ""}
      />
      <button>Submit</button>
      {error && <div style={{ paddingBottom: "1.1rem" }}>{error}</div>}
    </form>
  );
}
