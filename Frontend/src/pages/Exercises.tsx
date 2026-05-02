import { useEffect, useState } from "react";
import ExerciseCard from "../components/ExerciseCard";
import SectionHeader from "../components/SectionHeader";
import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { NewWorkoutModal } from "../components/NewWorkoutModal";

export interface ExercisePR {
  id: number;
  name: string;
  weight: number;
  reps: number;
  sets: number;
}

export interface WorkoutPR {
  group: string;
  exercises: ExercisePR[];
}

export type WorkoutPRs = WorkoutPR[];

const groups = ["All", "Chest", "Back", "Legs", "Shoulders", "Arms", "Core"];

const Exercises = () => {
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("All");
  const [data, setData] = useState<WorkoutPRs>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const fetchPRs = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const res = await api.get<WorkoutPRs>("/workoutEntry/prs");

      setData(res.data || []);
    } catch (err) {
      console.error("Error fetching PRs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: any) => {
    try {
      await api.post("/workoutEntry", {
        exercise_id: data.exercise_id,
        weight: data.weight,
        reps: data.reps,
        sets: data.sets,
        created_at: data.date,
      });

      fetchPRs();
    } catch (err: any) {
      alert("Failed to save");
    }
  };

  useEffect(() => {
    fetchPRs();
  }, [user?.id]);

  const filteredGroups = data
    .filter((g) => group === "All" || g.group === group)
    .map((g) => ({
      ...g,
      exercises: g.exercises.filter((ex) =>
        ex.name.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter((g) => g.exercises.length > 0);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="app">
      <div className="main">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1>Exercises</h1>
            <p style={{ opacity: 0.6 }}>Your training arsenal.</p>
          </div>

          <button className="btn" onClick={() => setOpen(true)}>
            + New Entry
          </button>
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <input
            placeholder="Search exercises..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={group} onChange={(e) => setGroup(e.target.value)}>
            {groups.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Sections */}
        {filteredGroups.map((group) => (
          <div key={group.group}>
            <SectionHeader title={group.group} count={group.exercises.length} />

            <div className="exercise-grid">
              {group.exercises.map((ex, index) => (
                <ExerciseCard key={index} exercise={ex} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <NewWorkoutModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default Exercises;
