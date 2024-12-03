import {
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect } from "react";
import { RiPlayLargeFill } from "react-icons/ri";
import { initialEdges, initialNodes } from "../data/data";
import { run } from "../instructions/runProgram";
import { CODOPS } from "../interfaces/CODOP";
import { cycleStrokeColors } from "../interfaces/Cycles";
import { Register, RegisterAddress } from "../interfaces/RegisterBank";
import useStore from "../store/useStore";
import { getBinary } from "../utils/actions";
import { Alert } from "../utils/swal";
import {
  AddressNode,
  ALUNode,
  BusNode,
  ComputerNode,
  MemoryNode,
  PrincipalMemoryNode,
  RegisterBankNode,
  RegisterNode,
} from "./ComputerNode";
import { SettingsMenu } from "./SettingsMenu";

const nodeTypes = {
  AddressNode,
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
  const COMPUTER = useStore((store) => store.COMPUTER);
  const items = useStore((store) => store.items);
  const isProgamRunning = useStore((store) => store.isProgamRunning);
  const setIsProgamRunning = useStore((store) => store.setIsProgamRunning);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        const updatedNode = { ...node };

        if (node.id === "RegisterBank") return node;

        if (node.id === "PC") {
          const nodeValue = COMPUTER.PC;

          if (nodeValue === -1) {
            return {
              ...updatedNode,
              data: {
                ...updatedNode.data,
                value: getBinary(0),
              },
            };
          }
        }

        updatedNode.data = {
          ...updatedNode.data,
          active:
            node.id === COMPUTER.currentComponent ||
            node.id === COMPUTER.lastComponent,
        };

        if (COMPUTER.currentCycle === "DI" && node.id === "UC") {
          const nodeValue = COMPUTER.UC;
          updatedNode.data = {
            ...updatedNode.data,
            value: `${nodeValue.codop} ${getBinary(nodeValue.operand1)} ${getBinary(nodeValue.operand2)}`,
          };
          return updatedNode;
        }

        if (["AL", "BL", "CL", "DL"].includes(node.id)) {
          const registerValue = COMPUTER.RegisterBank[node.id as Register];
          updatedNode.data = {
            ...updatedNode.data,
            value: getBinary(registerValue),
          };
        } else if (updatedNode.id in COMPUTER) {
          const nodeValue = COMPUTER[updatedNode.id as keyof typeof COMPUTER];

          if (nodeValue && typeof nodeValue === "number") {
            updatedNode.data = {
              ...updatedNode.data,
              value: getBinary(nodeValue),
            };
          } else if (nodeValue && typeof nodeValue === "object") {
            if ("codop" in nodeValue) {
              if (["AL", "BL", "CL", "DL"].includes(nodeValue.operand1)) {
                if (["AL", "BL", "CL", "DL"].includes(nodeValue.operand2)) {
                  updatedNode.data = {
                    ...updatedNode.data,
                    value: `${CODOPS[nodeValue.codop as keyof typeof CODOPS]} ${RegisterAddress[nodeValue.operand1 as Register]} ${RegisterAddress[nodeValue.operand2 as Register]}`,
                  };
                  return updatedNode;
                }
                updatedNode.data = {
                  ...updatedNode.data,
                  value: `${CODOPS[nodeValue.codop as keyof typeof CODOPS]} ${RegisterAddress[nodeValue.operand1 as Register]} ${getBinary(nodeValue.operand2)}`,
                };
                return updatedNode;
              } else if (
                ["AL", "BL", "CL", "DL"].includes(nodeValue.operand2)
              ) {
                updatedNode.data = {
                  ...updatedNode.data,
                  value: `${CODOPS[nodeValue.codop as keyof typeof CODOPS]} ${getBinary(nodeValue.operand1)} ${RegisterAddress[nodeValue.operand2 as Register]}`,
                };
                return updatedNode;
              }

              updatedNode.data = {
                ...updatedNode.data,
                value: `${CODOPS[nodeValue.codop as keyof typeof CODOPS]} ${getBinary(nodeValue.operand1)} ${getBinary(nodeValue.operand2)}`,
              };
            }
          }
        }

        return updatedNode;
      }),
    );
  }, [COMPUTER, setNodes]);

  useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        source: COMPUTER.lastComponent ?? edge.source,
        target: COMPUTER.currentComponent ?? edge.target,
        style: {
          ...edge.style,
          stroke: cycleStrokeColors[COMPUTER.currentCycle],
        },
      })),
    );
  }, [COMPUTER, setEdges]);

  const handleOnClick = () => {
    if (items.length > 0) {
      const NODE_HEIGHT = 50;
      const NODE_MARGIN = 10;

      const newNodes = items.map((item, index) => ({
        id: item.id,
        type: "AddressNode",
        position: {
          x: 10,
          y: index === 0 ? 50 : 50 + index * (NODE_HEIGHT + NODE_MARGIN),
        },
        data: {
          label: getBinary(index),
          value: `${CODOPS[item.codop as keyof typeof CODOPS]} ${getBinary(item.operand1)} ${getBinary(item.operand2)}`,
          active: false,
        },
        draggable: true,
        parentId: "PM",
      }));

      setNodes((prevNodes) => [...prevNodes, ...newNodes]);
      setIsProgamRunning(true);
      run();
    } else {
      Alert({
        text: "Se debe ingresar por lo menos una instrucción al programa",
      });
    }
  };

  return (
    <div className="flex h-[90vh] flex-col">
      <div className="w-fit rounded-t-lg bg-stone-500 p-2">
        <h1 className="text-xl font-bold">Computador</h1>
      </div>
      <div className="flex h-full flex-col gap-2 rounded-b-lg rounded-tr-lg bg-stone-500 p-2">
        <SettingsMenu>
          <button
            className={`bottom-2 flex max-w-[280px] items-center justify-center gap-2 rounded-lg border px-4 py-2 font-medium text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isProgamRunning ? "border-gray-600 bg-gray-400" : "border-green-600 bg-[#00ff66]"}`}
            onClick={handleOnClick}
            disabled={isProgamRunning}
          >
            <RiPlayLargeFill />
            {isProgamRunning ? "Programa ejecutándose..." : "Ejecutar programa"}
          </button>
        </SettingsMenu>

        <div className="h-full w-[300px] rounded-md md:w-[800px]">
          <ReactFlow
            className="bg-[#2f2f2f]"
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            nodeTypes={nodeTypes}
            nodesDraggable={false}
          >
            <Controls style={{ color: "black" }} showInteractive={false} />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};
