import { Handle, Position } from "@xyflow/react";
import React from "react";

type ComputerNodeProps = {
  data: {
    label: string;
    value: string;
    active: boolean;
  };
};

const globalNodeStyle: React.CSSProperties = {
  padding: "10px",
  borderRadius: "5px",
  width: "100px",
  textAlign: "center",
};

export const ALUNode: React.FC<ComputerNodeProps> = ({ data }) => {
  const { label, value, active } = data;

  // Estilos para el contenedor principal de la ALU
  const aluContainerStyle: React.CSSProperties = {
    position: "relative",
    width: "150px",
    height: "100px",
    margin: "20px auto",
  };

  // Estilo para la forma de la ALU
  const aluStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    backgroundColor: `${active ? "rgb(158, 118, 255)" : "gray"}`,
    clipPath:
      "polygon(0% 0%, 35% 0%, 50% 30%, 65% 0%, 100% 0%, 100% 60%, 50% 100%, 0% 60%)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={aluContainerStyle}>
      <div style={aluStyle}>
        <strong>{label}</strong>
        <div>{value}</div>
      </div>
      <Handle type="source" position={Position.Bottom} id="sourceHandle" />
      <Handle type="target" position={Position.Top} id="targetHandle" />
    </div>
  );
};

export const RegisterNode: React.FC<ComputerNodeProps> = ({ data }) => {
  const { label, value, active } = data;

  const nodeStyle: React.CSSProperties = {
    ...globalNodeStyle,
    border: `2px solid ${active ? "rgb(158, 118, 255)" : "gray"}`,
    width: "200px",
    height: "50px",
    display: "flex",
    justifyContent: "space-between",
  };

  return (
    <div style={nodeStyle}>
      <strong>{label}</strong>
      <div>{value}</div>
      <Handle type="source" position={Position.Right} id="sourceHandle" />
      <Handle type="source" position={Position.Bottom} id="sourceHandle" />
      <Handle type="target" position={Position.Top} id="targetHandle" />
      <Handle type="target" position={Position.Left} id="targetHandle" />
    </div>
  );
};

export const RegisterBankNode: React.FC<ComputerNodeProps> = ({ data }) => {
  const { label, value, active } = data;

  const nodeStyle: React.CSSProperties = {
    ...globalNodeStyle,
    border: `2px solid ${active ? "rgb(158, 118, 255)" : "gray"}`,
    width: "220px",
    height: "300px",
  };

  return (
    <div style={nodeStyle}>
      <strong>{label}</strong>
      <div>{value}</div>
      <Handle type="source" position={Position.Right} id="sourceHandle" />
      <Handle type="source" position={Position.Bottom} id="sourceHandle" />
      <Handle type="target" position={Position.Top} id="targetHandle" />
      <Handle type="target" position={Position.Left} id="targetHandle" />
    </div>
  );
};

export const MemoryNode: React.FC<ComputerNodeProps> = ({ data }) => {
  const { label, value, active } = data;

  const nodeStyle: React.CSSProperties = {
    ...globalNodeStyle,
    border: `2px solid ${active ? "rgb(158, 118, 255)" : "gray"}`,
    width: "400px",
    height: "200px",
  };

  return (
    <div style={nodeStyle}>
      <strong>{label}</strong>
      <div>{value}</div>
      <Handle type="source" position={Position.Left} id="sourceHandle" />
      <Handle type="target" position={Position.Left} id="targetHandle" />
    </div>
  );
};

export const PrincipalMemoryNode: React.FC<ComputerNodeProps> = ({ data }) => {
  const { label, value, active } = data;

  const nodeStyle: React.CSSProperties = {
    ...globalNodeStyle,
    border: `2px solid ${active ? "rgb(158, 118, 255)" : "gray"}`,
    width: "420px",
    height: "470px",
  };

  return (
    <div style={nodeStyle}>
      <strong>{label}</strong>
      <div>{value}</div>
      {/* <Handle type="source" position={Position.Right} id="sourceHandle" />
      <Handle type="source" position={Position.Bottom} id="sourceHandle" />
      <Handle type="target" position={Position.Top} id="targetHandle" />
      <Handle type="target" position={Position.Left} id="targetHandle" /> */}
    </div>
  );
};

export const ComputerNode: React.FC<ComputerNodeProps> = ({ data }) => {
  const { label, value, active } = data;

  const nodeStyle: React.CSSProperties = {
    ...globalNodeStyle,
    border: `2px solid ${active ? "rgb(158, 118, 255)" : "gray"}`,
  };

  return (
    <div style={nodeStyle}>
      <strong>{label}</strong>
      <div>{value}</div>
      <Handle type="source" position={Position.Right} id="sourceHandle" />
      <Handle type="source" position={Position.Bottom} id="sourceHandle" />
      <Handle type="target" position={Position.Top} id="targetHandle" />
      <Handle type="target" position={Position.Left} id="targetHandle" />
    </div>
  );
};

export const BusNode: React.FC<ComputerNodeProps> = ({ data }) => {
  const { label, value, active } = data;

  const nodeStyle: React.CSSProperties = {
    ...globalNodeStyle,
    border: `2px solid ${active ? "rgb(158, 118, 255)" : "gray"}`,
    height: "450px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  return (
    <div style={nodeStyle}>
      <strong>{label}</strong>
      <div>{value}</div>
      <Handle type="source" position={Position.Right} id="sourceHandle" />
      <Handle type="source" position={Position.Bottom} id="sourceHandle" />
      <Handle type="target" position={Position.Top} id="targetHandle" />
      <Handle type="target" position={Position.Left} id="targetHandle" />
    </div>
  );
};
