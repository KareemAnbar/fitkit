import type { LucideIcon } from "lucide-react";
import "../styles/metriccard.css";

interface Props {
  title: string;
  value: string;
  date: string;
  icon: LucideIcon;
}

const MetricCard = ({ title, value, date, icon: Icon }: Props) => {
  return (
    <div className="card">
      <div className="title-container">
        <Icon className="icon" size={18} />
        <p className="title">{title}</p>
      </div>
      <h1 className="value">{value}</h1>
      <p className="date">{date}</p>
    </div>
  );
};

export default MetricCard;
