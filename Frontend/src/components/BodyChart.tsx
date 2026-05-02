import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { BodyEntry } from "../types/body";

interface Props {
  data: BodyEntry[];
}

const BodyChart = ({ data }: Props) => {
  return (
    <div className="card" style={{ height: "350px" }}>
      <h3>Mass Trend</h3>
      <p style={{ opacity: 0.6, marginBottom: "10px" }}>
        Your weight changes over time
      </p>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <XAxis dataKey={"created_at"} />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="body_mass"
            stroke="#ff6b6b"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="body_fat"
            stroke="#f0a500"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BodyChart;
