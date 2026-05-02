import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";
import { LogSetModal } from "../components/LogSetModal";
import { Trophy } from "lucide-react";
import ExerciseChart from "../components/ExerciseCharts";
import WorkoutHistory from "../components/WorkoutHistory";

export interface WorkoutEntry {
  id?: number;
  weight: number;
  reps: number;
  sets: number;
  created_at: string;
}

interface Exercise {
  id: number;
  name: string;
  group: string;
}

const ExerciseDetail = () => {
  const { id } = useParams();

  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [history, setHistory] = useState<WorkoutEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<WorkoutEntry | null>(null);

  const fetchData = async () => {
    api
      .get(`/workoutEntry/exercise/${id}`)
      .then((res) => {
        setHistory(res.data.history);
        setExercise(res.data.exercise);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const handleSave = async (data: any) => {
    try {
      if (data.id) {
        await api.put(`/workoutEntry`, {
          id: data.id,
          weight: data.weight,
          reps: data.reps,
          sets: data.sets,
          created_at: data.created_at,
        });
      } else {
        await api.post("/workoutEntry", {
          exercise_id: id,
          weight: data.weight,
          reps: data.reps,
          sets: data.sets,
          created_at: data.created_at,
        });
      }

      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to save");
    }
  };

  const handleDelete = async (entry: WorkoutEntry) => {
    try {
      await api.delete(`/workoutEntry/${entry.id}`);
      fetchData();
    } catch (err: any) {
      alert("Delete failed");
    }
  };

  const handleEdit = (entry: WorkoutEntry) => {
    setSelectedEntry(entry);
    setOpen(true);
  };

  if (loading) return <p>Loading...</p>;

  const latest = history.at(-1);
  const personalBest = Math.max(...history.map((h) => h.weight), 0);

  const chartData = history.map((h) => ({
    date: new Date(h.created_at).toLocaleDateString(),
    volume: h.weight * h.reps * h.sets,
  }));

  return (
    <div className="main">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1>{exercise?.name}</h1>
          <p style={{ opacity: 0.6 }}>{exercise?.group}</p>
        </div>
      </div>

      {/* TOP CARDS */}
      <div className="grid-3">
        <div className="card highlight">
          <div style={{ display: "flex", gap: "5px" }}>
            <p>
              <Trophy size={16} />
              <span> </span>
              PERSONAL BEST
            </p>
          </div>
          <h1 style={{ color: "white" }}>{personalBest} kg</h1>
        </div>

        <div className="card">
          <div className="last-session">
            <p>LAST SESSION</p>
            {latest ? (
              <>
                <h3>
                  {latest.weight}kg × {latest.reps}r × {latest.sets}s
                </h3>
                <small style={{ opacity: 0.6 }}>
                  {new Date(latest.created_at).toDateString()}
                </small>
              </>
            ) : (
              <p>No data</p>
            )}
          </div>
        </div>

        <div className="card dashed">
          <button
            className="btn full"
            onClick={() => {
              setSelectedEntry(null);
              setOpen(true);
            }}
          >
            + New Entry
          </button>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="content">
        <div className="card">
          <h3>Volume Progression</h3>

          {history.length > 0 ? (
            <div style={{ marginTop: "30px", height: "250px" }}>
              <ExerciseChart data={chartData} />
            </div>
          ) : (
            <p style={{ opacity: 0.6 }}>No data yet</p>
          )}
        </div>

        <div className="card" style={{ padding: 0 }}>
          <WorkoutHistory
            data={history}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <LogSetModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setSelectedEntry(null);
        }}
        onSave={handleSave}
        initialData={
          selectedEntry
            ? {
                id: selectedEntry.id,
                created_at: selectedEntry.created_at,
                weight: selectedEntry.weight,
                reps: selectedEntry.reps,
                sets: selectedEntry.sets,
              }
            : null
        }
      />
    </div>
  );
};

export default ExerciseDetail;
