import React from "react";

type ComputerNodeProps = {
  data: {
    label: string;
    value: string;
    active: boolean;
  };
};

export const ComputerNode: React.FC<ComputerNodeProps> = ({ data }) => {
  const { label, value, active } = data;

  const nodeStyle: React.CSSProperties = {
    border: `2px solid ${active ? "green" : "gray"}`,
    padding: "10px",
    borderRadius: "5px",
    width: "100px",
    textAlign: "center",
  };

  return (
    <div style={nodeStyle}>
      <strong>{label}</strong>
      <div>{value}</div>
    </div>
  );
};
