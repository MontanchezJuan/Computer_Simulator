/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect } from "react";
import { initialEdges, initialNodes } from "../data/data";
import { moveInstruction } from "../instructions/moveInstruction";
import { Register } from "../interfaces/RegisterBank";
import useStore from "../store/useStore";
import {
  ALUNode,
  BusNode,
  ComputerNode,
  MemoryNode,
  PrincipalMemoryNode,
  RegisterBankNode,
  RegisterNode,
} from "./ComputerNode";

const nodeTypes = {
  ALUNode,
  BusNode,
  ComputerNode,
  MemoryNode,
  PrincipalMemoryNode,
  RegisterBankNode,
  RegisterNode,
};

export const Components = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const {
    currentComponent,
    currentCycle,
    currentValue,
    lastComponent,
    registerBank,
  } = useStore((store) => store.currentinstruction);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (["AL", "BL", "CL", "DL"].includes(node.data.label as Register)) {
          const newValue = registerBank[node.data.label as Register];
          return {
            ...node,
            data: {
              ...node.data,
              value: newValue || "00000000",
            },
          };
        }
        return node;
      }),
    );
  }, [registerBank, setNodes]);

  useEffect(() => {
    setEdges((eds: any) =>
      eds.map((edge: any) => ({
        ...edge,
        source: lastComponent,
        target: currentComponent,
        label: currentValue,
      })),
    );
  }, [currentComponent, lastComponent, currentValue, setEdges]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.data.label === currentComponent) {
          return {
            ...node,
            data: {
              ...node.data,
              value: `${currentValue}`,
              active: true,
            },
          };
        }
        return { ...node, data: { ...node.data, active: false } };
      }),
    );
  }, [currentComponent, currentValue, setNodes]);

  return (
    <>
      <div style={{ width: "100%", height: "400px" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          nodeTypes={nodeTypes}
          nodesDraggable={false}
          panOnDrag={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
        >
          <Controls
            style={{ color: "black" }}
            showInteractive={false}
            showZoom={false}
          />
          <Background />
        </ReactFlow>
      </div>
      <h1>Ciclo actual: {currentCycle}</h1>
      <button onClick={() => moveInstruction("AL", 1)}>click</button>
    </>
  );
};
