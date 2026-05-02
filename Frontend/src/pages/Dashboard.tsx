import StatCard from "../components/StatCard";
import ActivityCard from "../components/ActivityCard";
import MuscleBar from "../components/MuscleBar";
import { useEffect, useState } from "react";
import { api } from "../api/axios";

import { useAuth } from "../context/AuthContext";
import {
  Apple,
  ChartNoAxesCombined,
  ChevronsDown,
  Dumbbell,
  Flame,
  PersonStanding,
  Scale,
} from "lucide-react";

interface DashboardStats {
  date_range: {
    start: string;
    end: string;
  };
  active_days: number;
  highest_volume_group: { group: string; volume: number } | null;
  lowest_volume_groups: string[];
  weekly_summary: { group: string; sets: number; volume: number }[];
  recent_workouts:
    | {
        date: string;
        group: string;
        sets: number;
        volume: number;
      }[]
    | null;
  latest_body: {
    body_mass: number;
    body_fat: number;
    date: string;
  } | null;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const fetchData = () => {
    if (!user?.id) return;

    setLoading(true);

    api
      .get("/dashboard/stats")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error(err);
        setStats(null);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user?.id) fetchData();
  }, [user?.id]);

  if (loading) return <p>Loading your stats...</p>;

  const body = stats?.latest_body;
  const hasBodyData = !!body;

  const totalVolume =
    stats?.weekly_summary.reduce((sum, g) => sum + (g.volume || 0), 0) ?? 0;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-GB").replace(/\//g, "-");
  };
  return (
    <div className="app">
      <div className="main">
        <h1>Overview</h1>
        <p style={{ opacity: 0.6 }}>
          Welcome <strong style={{ color: "black" }}>{user?.name}</strong>.
          Here's your training summary for the period:
          <strong>
            {`${formatDate(stats?.date_range.start)} → ${formatDate(stats?.date_range.end)}`}
          </strong>
        </p>

        {/* Stats */}
        <div className="grid grid-5" style={{ marginTop: "20px" }}>
          <StatCard
            title="Body Mass"
            value={hasBodyData ? `${body.body_mass} kg` : "—"}
            subtitle={
              hasBodyData
                ? new Date(body.date).toLocaleDateString()
                : "Add your first measurement"
            }
            icon={Scale}
          />
          <StatCard
            title="Body Fat %"
            value={hasBodyData ? `${body.body_fat}%` : "—"}
            subtitle={
              hasBodyData
                ? new Date(body.date).toLocaleDateString()
                : "Add your first measurement"
            }
            icon={PersonStanding}
          />
          <StatCard
            title="Calories Today"
            value="1618 kcal"
            subtitle="3 entries"
            icon={Apple}
          />
          <StatCard
            title="Total Volume"
            value={`${totalVolume} kg`}
            subtitle={"This week"}
            icon={Flame}
          />
          <StatCard
            title="Active Days"
            value={String(stats?.active_days ?? 0)}
            subtitle="This week"
            icon={ChartNoAxesCombined}
          />
          <StatCard
            title="Highest Volume"
            value={
              stats?.highest_volume_group?.volume !== 0
                ? (stats?.highest_volume_group?.group ?? "—")
                : "—"
            }
            subtitle="This week"
            icon={Dumbbell}
          />

          <StatCard
            title="Least volume"
            value={
              stats!!.lowest_volume_groups.length < 6
                ? stats!!.lowest_volume_groups[0]
                : "-"
            }
            subtitle="This week"
            icon={ChevronsDown}
          />
        </div>

        {/* Content */}
        <div className="content">
          {/* Left */}
          <div>
            <h2 className="stat-header">Recent Activity</h2>

            <div style={{ marginTop: "15px", display: "grid", gap: "15px" }}>
              {stats?.recent_workouts?.slice(0, 4).map((w, i) => (
                <ActivityCard
                  key={i}
                  date={new Date(w.date).toLocaleDateString()}
                  sets={w.sets}
                  volume={w.volume}
                  tag={w.group}
                />
              ))}
              {!stats?.recent_workouts?.length && <p>No workouts yet</p>}
            </div>
          </div>

          {/* Right */}
          <div>
            <h2 className="stat-header">Muscle Focus</h2>

            <div style={{ marginTop: "15px" }}>
              {stats?.weekly_summary.map((g) => (
                <MuscleBar
                  key={g.group}
                  label={g.group}
                  value={(g.volume / totalVolume) * 100}
                  primaryText={`${g.volume} kg`}
                  secondaryText={`${g.sets} sets`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
