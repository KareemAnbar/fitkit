import MetricCard from "../components/MetricCard";
import BodyChart from "../components/BodyChart";
import BodyHistory from "../components/BodyHistory";
import type { BodyEntry } from "../types/body";
import { api } from "../api/axios";
import { useEffect, useState } from "react";
import { MeasurementModal } from "../components/BodyModal";
import { useAuth } from "../context/AuthContext";
import { PersonStanding, Scale } from "lucide-react";

const Body = () => {
  const [bodyData, setbodyData] = useState<BodyEntry[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedEntry, setSelectedEntry] = useState<BodyEntry | null>(null);
  const { user } = useAuth();

  const fetchData = () => {
    api
      .get<BodyEntry[]>("/bodyMass")
      .then((response) => {
        setbodyData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching logs:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNewBodyEntry = async (data: any) => {
    const dataEntry = {
      id: data.id,
      user_id: user?.id,
      body_mass: Number(data.mass),
      body_fat: Number(data.bodyFat),
      created_at: `${data.createdAt}`,
    };
    try {
      if (data.id !== undefined && data.id !== null) {
        await api.put("/bodyMass", dataEntry);
      } else {
        await api.post("/bodyMass", dataEntry);
      }

      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to save entry");
    }
  };

  const handleEdit = async (entry: BodyEntry) => {
    setSelectedEntry(entry);
    setOpen(true);
  };
  const handleDelete = async (entry: BodyEntry) => {
    try {
      await api.delete(`/bodyMass/${entry.id}`);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to delete entry");
    }
  };

  const latestEntry =
    bodyData.length > 0 ? bodyData[bodyData.length - 1] : null;

  if (loading) return <p>Loading your stats...</p>;

  return (
    <div className="app">
      <div className="main">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1>Body Metrics</h1>
            <p style={{ opacity: 0.6 }}>
              Track your physical composition over time.
            </p>
          </div>

          <button
            className="btn"
            onClick={() => {
              setSelectedEntry(null);
              setOpen(true);
            }}
          >
            + New Measurement
          </button>

          <MeasurementModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onSave={handleNewBodyEntry}
            initialData={
              selectedEntry
                ? {
                    id: selectedEntry.id,
                    mass: selectedEntry.body_mass,
                    bodyFat: selectedEntry.body_fat,
                    createdAt: selectedEntry.created_at,
                  }
                : null
            }
          />
        </div>

        {/* Top Cards */}
        <div
          className="grid"
          style={{ gridTemplateColumns: "1fr 1fr", marginTop: "20px" }}
        >
          <MetricCard
            icon={Scale}
            title="CURRENT MASS"
            value={`${latestEntry ? latestEntry?.body_mass + "kg" : "-"} `}
            date={`${latestEntry ? new Date(latestEntry?.created_at).toLocaleDateString() : "Add your first measurement"}`}
          />

          <MetricCard
            icon={PersonStanding}
            title="CURRENT BODY FAT"
            value={`${latestEntry ? latestEntry?.body_fat + "%" : "-"} `}
            date={`${latestEntry ? new Date(latestEntry?.created_at).toLocaleDateString() : "Add your first measurement"}`}
          />
        </div>

        {/* Bottom Section */}
        <div className="content">
          <BodyChart data={bodyData} />
          <BodyHistory
            data={[...bodyData].reverse()}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Body;
