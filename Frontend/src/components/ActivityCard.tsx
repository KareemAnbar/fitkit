interface ActivityCardProps {
  date: string;
  sets: number;
  volume: number;
  tag: string;
}

const ActivityCard = ({ date, sets, volume, tag }: ActivityCardProps) => {
  return (
    <div className="card">
      <h3>{date}</h3>
      <p>
        {sets} sets • {volume} kg vol
      </p>

      <span
        style={{
          background: "#2cb8a0",
          color: "white",
          padding: "4px 8px",
          borderRadius: "6px",
          fontSize: "12px",
        }}
      >
        {tag}
      </span>
    </div>
  );
};

export default ActivityCard;
