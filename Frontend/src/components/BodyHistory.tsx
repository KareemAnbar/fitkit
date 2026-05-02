import { useState } from "react";
import type { BodyEntry } from "../types/body";
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  History,
  Pencil,
  Trash2,
} from "lucide-react";

interface Props {
  data: BodyEntry[];
  onEdit: (entry: BodyEntry) => void;
  onDelete: (entry: BodyEntry) => void;
}

const BodyHistory = ({ data, onEdit, onDelete }: Props) => {
  const [isAscending, setIsAscending] = useState(false);

  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return isAscending ? dateA - dateB : dateB - dateA;
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
              <strong style={{ fontSize: "16px" }}>
                {entry.body_mass} kg • {entry.body_fat}% BF
              </strong>
              <p style={{ fontSize: "12px", opacity: 0.5, margin: "4px 0 0" }}>
                {new Date(entry.created_at).toLocaleDateString()}
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => onEdit(entry)}
                style={iconButtonStyle("#f0f7ff", "#007bff")}
              >
                <Pencil />
              </button>
              <button
                onClick={() => onDelete(entry)}
                style={iconButtonStyle("#fff1f0", "#ff4d4f")}
              >
                <Trash2 />
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

export default BodyHistory;
