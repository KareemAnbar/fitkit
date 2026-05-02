import { type LucideIcon } from "lucide-react";
import "../styles/statcard.css";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
}

const StatCard = ({ title, value, subtitle, icon: Icon }: StatCardProps) => {
  return (
    <div className="card">
      <div className="stat-title-container">
        <p className="title">{title}</p>
        <Icon className="icon" size={18} />
      </div>

      <h2>{value}</h2>
      <p className="subtitle">{subtitle}</p>
    </div>
  );
};

export default StatCard;
