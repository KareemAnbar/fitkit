import { useEffect, useState } from "react";
import "../styles/modal.css";
import type { WorkoutEntry } from "../pages/ExerciseDetail";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: WorkoutEntry) => void;
  initialData?: WorkoutEntry | null;
}

export const LogSetModal = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}: Props) => {
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");

  useEffect(() => {
    if (initialData) {
      setDate(initialData.created_at?.slice(0, 10) || "");
      setWeight(String(initialData.weight));
      setReps(String(initialData.reps));
      setSets(String(initialData.sets));
    } else {
      setDate("");
      setWeight("");
      setReps("");
      setSets("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      id: initialData?.id,
      created_at: date,
      weight: Number(weight),
      reps: Number(reps),
      sets: Number(sets),
    });

    setDate("");
    setWeight("");
    setReps("");
    setSets("");

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{initialData ? "Edit Entry" : "New Entry"}</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="row">
            <div className="field">
              <label>Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>Reps</label>
              <input
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>Sets</label>
              <input
                type="number"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <label>Date</label>
            <input
              type="date"
              value={date}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <button className="btn full" type="submit">
            {initialData ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};
