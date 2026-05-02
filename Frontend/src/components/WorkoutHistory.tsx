import { useState } from "react";
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  History,
  Pencil,
  Trash2,
} from "lucide-react";
import type { WorkoutEntry } from "../pages/ExerciseDetail";

interface Props {
  data: WorkoutEntry[];
  onEdit: (entry: WorkoutEntry) => void;
  onDelete: (entry: WorkoutEntry) => void;
}

const WorkoutHistory = ({ data, onEdit, onDelete }: Props) => {
  const [isAscending, setIsAscending] = useState(false);

  const sortedData = [...data].sort((a, b) => {
    const aTime = new Date(a.created_at).getTime();
    const bTime = new Date(b.created_at).getTime();
    return isAscending ? aTime - bTime : bTime - aTime;
  });

  return (
    <div className="card" style={{ height: "350px", overflowY: "auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h3 className="title-with-icon">
          <History size={18} />
          History
        </h3>

        <button
          onClick={() => setIsAscending(!isAscending)}
          style={{
            padding: "4px 4px",
            fontSize: "12px",
            cursor: "pointer",
            borderRadius: "4px",
            border: "1px solid #ccc",
            background: "#fff",
            backgroundColor: "#2cb8a0",
            color: "white",
          }}
        >
          {isAscending ? <ArrowUpNarrowWide /> : <ArrowDownWideNarrow />}
        </button>
      </div>

      <div style={{ marginTop: "10px" }}>
        {sortedData.map((entry) => (
          <div
            key={entry.id}
            style={{
              padding: "12px 0",
              borderBottom: "1px solid #eee",
              borderTop: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: "16px" }}>
                {entry.weight} kg × {entry.reps}r × {entry.sets}s
              </div>

              <div
                style={{ fontSize: "12px", opacity: 0.5, margin: "4px 0 0" }}
              >
                {new Date(entry.created_at).toLocaleDateString()}
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => onEdit(entry)}
                style={iconButtonStyle("#f0f7ff", "#007bff")}
              >
                <Pencil size={16} />
              </button>

              <button
                onClick={() => onDelete(entry)}
                style={iconButtonStyle("#fff1f0", "#ff4d4f")}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const iconButtonStyle = (bg: string, color: string) => ({
  background: bg,
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  padding: "6px 10px",
  fontSize: "14px",
  color: color,
  transition: "opacity 0.2s",
});

export default WorkoutHistory;
