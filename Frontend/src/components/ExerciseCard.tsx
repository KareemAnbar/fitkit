import { Link } from "react-router-dom";
import type { ExercisePR } from "../pages/Exercises";

interface Props {
  exercise: ExercisePR;
}

const ExerciseCard = ({ exercise }: Props) => {
  return (
    <Link
      to={`/exercises/${exercise.id}`}
      className="card"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="card" style={{ border: "0px" }}>
        <h3>{exercise.name}</h3>

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <div className="mini-card">
            <p>PERSONAL BEST</p>
            <strong>{exercise.weight} kg</strong>
          </div>

          <div className="mini-card">
            <p>LAST SESSION</p>
            <strong>
              {exercise.sets}s × {exercise.reps}r
            </strong>
          </div>
        </div>

        <div className="card-footer">
          <span className="link">View details</span>
        </div>
      </div>
    </Link>
  );
};

export default ExerciseCard;
