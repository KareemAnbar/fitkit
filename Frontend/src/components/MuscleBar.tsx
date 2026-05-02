interface MuscleBarProps {
  label: string;
  value: number;
  primaryText: string;
  secondaryText: string;
}

const MuscleBar = ({
  label,
  value,
  primaryText,
  secondaryText,
}: MuscleBarProps) => {
  return (
    <div className="muscle-bar">
      {/* Top row */}
      <div className="muscle-bar-header">
        <span>{label}</span>
        <span className="primary">{primaryText}</span>
      </div>

      {/* Bar */}
      <div className="bar-bg">
        <div className="bar-fill" style={{ width: `${value}%` }} />
      </div>

      {/* Bottom row */}
      <div className="muscle-bar-footer">
        <span className="secondary">{secondaryText}</span>
      </div>
    </div>
  );
};

export default MuscleBar;
