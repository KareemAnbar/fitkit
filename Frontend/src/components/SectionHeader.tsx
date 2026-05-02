interface Props {
  title: string;
  count: number;
}

const SectionHeader = ({ title, count }: Props) => {
  return (
    <div style={{ margin: "25px 0 10px" }}>
      <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {title}
        <span className="badge">{count}</span>
      </h2>
      <hr style={{ marginTop: "10px", borderColor: "#eee" }} />
    </div>
  );
};

export default SectionHeader;
