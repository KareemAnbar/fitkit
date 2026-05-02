import { useEffect, useState } from "react";
import "../styles/modal.css";

interface Measurement {
  id?: string;
  mass: number;
  bodyFat: number;
  createdAt: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Measurement) => void;
  initialData?: Measurement | null;
}

export const MeasurementModal = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}: Props) => {
  const [mass, setMass] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    if (initialData) {
      setMass(String(initialData.mass));
      setBodyFat(String(initialData.bodyFat));
      setCreatedAt(initialData.createdAt || "");
    } else {
      setMass("");
      setBodyFat("");
      setCreatedAt("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      id: initialData?.id,
      mass: Number(mass),
      bodyFat: Number(bodyFat),
      createdAt: `${createdAt}`,
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{initialData ? "Edit Measurement" : "New Measurement"}</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="row">
            <div className="field">
              <label>Mass (kg)</label>
              <input
                type="number"
                value={mass}
                min={1}
                onChange={(e) => setMass(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>Body Fat (%)</label>
              <input
                type="number"
                value={bodyFat}
                min={1}
                onChange={(e) => setBodyFat(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <label>Date</label>
            <input
              type="date"
              value={createdAt}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setCreatedAt(e.target.value)}
            />
          </div>
          <button type="submit" className="save-btn">
            {initialData ? "Update" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};
