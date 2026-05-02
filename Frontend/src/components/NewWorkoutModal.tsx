import { useEffect, useState } from "react";
import "../styles/modal.css";
import { api } from "../api/axios";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    exercise_id: number;
    date: string;
    weight: number;
    sets: number;
    reps: number;
  }) => void;
}

export const NewWorkoutModal = ({ isOpen, onClose, onSave }: Props) => {
  interface CatalogGroup {
    id: number;
    group_name: string;
    exercises: {
      id: number;
      name: string;
    }[];
  }

  const [catalog, setCatalog] = useState<CatalogGroup[]>([]);

  const [selectedGroup, setSelectedGroup] = useState<number | "">("");
  const [selectedExercise, setSelectedExercise] = useState<number | "">("");

  const [date, setDate] = useState("");
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    resetForm();
    api
      .get<CatalogGroup[]>("/exercise/catalog")
      .then((res) => setCatalog(res.data))
      .catch((err) => console.error(err));
  }, [isOpen]);
  if (!isOpen) return null;

  const selectedGroupData = catalog.find((g) => g.id === selectedGroup);

  const resetForm = () => {
    setSelectedGroup("");
    setSelectedExercise("");
    setDate("");
    setWeight("");
    setSets("");
    setReps("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedExercise) {
      alert("Please select an exercise");
      return;
    }

    onSave({
      exercise_id: Number(selectedExercise),
      date,
      weight: Number(weight),
      sets: Number(sets),
      reps: Number(reps),
    });

    setSelectedGroup("");
    setSelectedExercise("");
    setDate("");
    setWeight("");
    setSets("");
    setReps("");

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Log New Exercise</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Muscle Group */}
          <div className="field">
            <label>Muscle Group</label>
            <select
              value={selectedGroup}
              onChange={(e) => {
                setSelectedGroup(Number(e.target.value));
                setSelectedExercise("");
              }}
              required
            >
              <option value="">Select group</option>
              {catalog.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.group_name}
                </option>
              ))}
            </select>
          </div>

          {/* Exercise */}
          <div className="field">
            <label>Exercise</label>
            <select
              value={selectedExercise}
              onChange={(e) => setSelectedExercise(Number(e.target.value))}
              required
              disabled={!selectedGroup}
            >
              <option value="">Select exercise</option>
              {selectedGroupData?.exercises.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
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

          {/* Inputs */}
          <div className="row">
            <div className="field">
              <label>Weight</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
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

            <div className="field">
              <label>Reps</label>
              <input
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                required
              />
            </div>
          </div>

          <button className="btn full" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
